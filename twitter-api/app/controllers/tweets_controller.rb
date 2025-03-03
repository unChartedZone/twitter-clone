# frozen_string_literal: true

class TweetsController < ApplicationController
  include Paginable
  before_action :is_authenticated,
                only: %i[create index show feed replied_tweets liked_tweets media_tweets like unlike retweet protected_profile_tweets
                         explore_user_tweets]

  def index
    tweets = current_user.tweets.includes([:medium]).page(current_page).per(per_page)
    render json: TweetSerializer.new(tweets).serializable_hash.to_json
  end

  def show
    tweet = Tweet.find(params[:id])
    options = { include: [:user], params: { current_user: current_user } }
    render json: TweetSerializer.new(tweet, options).serializable_hash.to_json, status: :ok
  end

  def feed
    following = @current_user.following
    tweets = Tweet
               .where(user_id: following)
               .or(Tweet.where(id: Retweet.select(:tweet_id).where(user_id: following)))
               .order(created_at: :desc)
               .page(current_page)
               .per(per_page)
    options = generate_tweet_options(tweets, 'feed_tweets_path')
    render json: TweetSerializer.new(tweets, options).serializable_hash.to_json
  end

  # Fetch tweets of user, required authentication in order to show if
  # authenticated user has liked, retweeted or bookmarked them
  def protected_profile_tweets
    tweets = fetch_user_tweets
    options = generate_tweet_options(tweets, 'profile_tweets_path')
    render json: TweetSerializer.new(tweets, options)
                                .serializable_hash.to_json
  end

  def replied_tweets
    user = User.find_by_username(params[:username])
    tweets = Tweet.where(id: Retweet.select(:tweet_id).where.not(tweet_id: nil).where(user_id: user.id))
                  .order(created_at: :desc)
                  .page(current_page)
                  .per(per_page)
    options = generate_tweet_options(tweets, 'replied_tweets_path')
    render json: TweetSerializer.new(tweets, options).serializable_hash.to_json, status: :ok
  end

  # Fetch tweets that have a media attachments
  def media_tweets
    user = User.find_by_username(params[:username])
    tweets = Tweet.where(id: Medium.select(:tweet_id).where.not(tweet_id: nil))
                  .order(created_at: :desc)
                  .page(current_page)
                  .per(per_page)
    options = generate_tweet_options(tweets, 'media_tweets_path')
    render json: TweetSerializer.new(tweets, options).serializable_hash.to_json
  end

  def liked_tweets
    user = User.find_by_username(params[:username])
    tweets = Tweet.where(id: Like.select(:tweet_id).where.not(tweet_id: nil).where(user_id: user.id))
                  .order(created_at: :desc)
                  .page(current_page)
                  .per(per_page)
    options = generate_tweet_options(tweets, 'liked_tweets_path')
    render json: TweetSerializer.new(tweets, options).serializable_hash.to_json
  end

  def create
    tweet = Tweet.new(tweet_params)
    tweet.user = current_user
    if tweet.save
      render json: TweetSerializer.new(tweet, { include: [:user], params: { current_user: } }).serializable_hash.to_json,
             status: :created
    else
      render json: { error: tweet.errors }, status: :bad_request
    end
  end

  def like
    tweet = Tweet.find(params[:id])
    if tweet.likes.find_by_user_id(current_user.id)
      render json: { message: 'Tweet already liked' }, status: :conflict
    else
      tweet.build_tweet_like(current_user.id)
      if tweet.save
        NotificationService.create_notification(
          initiator: current_user,
          recipient: tweet.user,
          action_text: "#{current_user.name} liked your tweet."
        )
        render json: TweetSerializer.new(tweet, { include: [:user], params: { current_user: } }), status: :created
      else
        render json: { errors: tweet.errors }, status: :unprocessable_entity
      end
    end
  end

  def unlike
    tweet = Tweet.find(params[:id])
    like = tweet.likes.find_by_user_id(current_user.id)
    if like.destroy
      head :no_content
    else
      render json: { message: 'Error unliking tweet' }, status: :bad_request
    end
  end

  def retweet
    tweet = Tweet.find(params[:id])
    if tweet.retweets.find_by_user_id(current_user.id)
      render json: { message: 'Tweet already retweeted' }, status: :conflict
    else
      tweet.build_retweet(current_user.id)
      if tweet.save
        NotificationService.create_notification(
          initiator: current_user,
          recipient: tweet.user,
          action_text: "#{current_user.name} retweeted your tweet."
        )
        render json: TweetSerializer.new(tweet, { include: [:user], params: { current_user: } }), status: :created
      else
        render json: { errors: tweet.errors }, status: :unprocessable_entity
      end
    end
  end

  def undo_retweet
    tweet = Tweet.find(params[:id])
    retweet = tweet.retweets.find_by_user_id(current_user.id)
    if retweet.destroy && tweet.save
      head :no_content
    else
      render json: { errors: retweet.errors }, status: :unprocessable_entity
    end
  end

  def explore_user_tweets
    users = User.where.not(id: current_user.following.pluck(:id)).where.not(id: current_user.id)
    tweets = Tweet.where(user_id: users)
                  .or(Tweet.where(id: Retweet.select(:tweet_id).where(user_id: users))).order(created_at: :desc).page(current_page).per(per_page)
    render json: TweetSerializer.new(tweets,
                                     { include: [:user],
                                       params: { current_user: @current_user } }).serializable_hash.to_json
  end

  private

  def generate_tweet_options(tweets, path)
    {
      include: [:user],
      params: { current_user: @current_user }
    }.merge(get_links_serializer_options(path, tweets))
  end

  def tweet_params
    params.require(:tweet).permit(:text, medium_ids: [])
  end

  def fetch_user_tweets
    user = User.find_by_username(params[:username])
    Tweet
      .where(user_id: user.id)
      .or(Tweet.where(id: Retweet.select(:tweet_id).where(user_id: user.id)))
      .order(created_at: :desc)
      .page(current_page)
      .per(per_page)
  end
end
