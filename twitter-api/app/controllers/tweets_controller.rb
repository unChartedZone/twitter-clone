class TweetsController < ApplicationController

  before_action :is_authenticated, only: [:create, :index, :like]

  def index
    tweets = current_user.tweets
    render json: TweetSerializer.new(tweets)
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
      render json: { message: "Tweet already liked" }, status: :conflict
    else
      tweet.build_tweet_like(current_user.id)
      if tweet.save
        render json: { tweet: tweet }, status: :created
      else
        render json: { errors: tweet.errors }, status: :unprocessable_entity
      end
    end
  end

  private

  def tweet_params
    params.require(:tweet).permit(:text, medium_ids: [])
  end
end
