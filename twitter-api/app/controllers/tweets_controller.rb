class TweetsController < ApplicationController

  before_action :is_authenticated, only: [:create, :index, :liked_tweets, :like, :unlike]

  def index
    tweets = current_user.tweets.includes([:medium])
    render json: TweetSerializer.new(tweets).serializable_hash.to_json
  end

  def liked_tweets
    tweets = Tweet.where(id:
      TweetLike.select(:tweet_id).where.not(tweet_id: nil).where(like_id: current_user.likes)
    )
    render json: TweetSerializer.new(tweets).serializable_hash.to_json
  end

  def create
    tweet = Tweet.new(tweet_params)
    tweet.user = current_user
    if tweet.save
      render json: { tweet: tweet }, status: :created
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
        render json: { tweet: tweet }, status: :created
      else
        render json: { errors: tweet.errors }, status: :unprocessable_entity
      end
    end
  end

  def unlike
    tweet = Tweet.find(params[:id])
    like = tweet.likes.find_by_user_id(current_user.id)
    if like.destroy && tweet.save
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
        render json: { tweet: tweet }, status: :created
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

  private

  def tweet_params
    params.require(:tweet).permit(:text, medium_ids: [])
  end
end
