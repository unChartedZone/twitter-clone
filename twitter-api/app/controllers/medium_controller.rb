class MediumController < ApplicationController
  before_action :is_authenticated, only: [:index, :create]
  before_action :set_tweet, only: [:create]

  def index
    medium = Medium.all
    render json: MediumSerializer.new(medium)
  end

  def create
    if new_media_params[:image].present?
      @media = Medium.new
      @media.image.attach(new_media_params[:image])
      @media.description = new_media_params[:description]
      @media.tweet = @tweet

      if @tweet.save && @media.save
        render json: TweetSerializer.new(@tweet, { include: [:user], params: { current_user: current_user } }), status: :created
      else
        render json: { media_errors: @media.errors, tweet_errors: @tweet.errors }, status: :bad_request
      end
    end
  end

  private

  def set_tweet
    @tweet = Tweet.find(params[:tweet_id])
  rescue ActiveRecord::RecordNotFound
    @tweet = Tweet.new(user: current_user)
  end

  def new_media_params
    params.permit(:image, :description, :tweet_id)
  end
end
