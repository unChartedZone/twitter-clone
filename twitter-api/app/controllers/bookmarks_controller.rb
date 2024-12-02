class BookmarksController < ApplicationController
  before_action :is_authenticated, only: %i[index create]
  before_action :set_tweet, only: [:create]

  def index
    bookmarks = current_user.bookmarked_tweets
    options = { include: [:user], params: { current_user: } }
    render json: TweetSerializer.new(bookmarks, options).serializable_hash.to_json, status: :ok
  end

  def create
    bookmark = current_user.bookmarks.new(tweet: @tweet)

    if bookmark.save
      render json: { message: 'Bookmark created' }, status: :created
    else
      render json: { errors: bookmark.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy; end

  private

  def set_tweet
    @tweet = Tweet.find(params[:tweet_id])
  rescue ActiveRecord::RecordNotFound
    render json: { errors: 'Tweet not found' }, status: :not_found
  end
end
