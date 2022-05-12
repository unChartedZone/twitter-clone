class TweetsController < ApplicationController

  before_action :is_authenticated, only: [:create]

  def index
    render json: Tweet.all
  end

  def create
    tweet = Tweet.new(tweet_params)
    tweet.user = current_user

    tweet.save

    render json: tweet, status: :created
  end

  private

  def tweet_params
    params.require(:tweet).permit(:text)
  end
end
