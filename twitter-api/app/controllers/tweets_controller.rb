class TweetsController < ApplicationController

  before_action :is_authenticated, only: [:create, :index]

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

  private

  def tweet_params
    params.require(:tweet).permit(:text, medium_ids: [])
  end
end
