class BookmarksController < ApplicationController
  before_action :is_authenticated, only: %i[index create destroy]
  before_action :set_tweet, only: %i[create destroy]

  def index
    bookmarks = current_user.bookmarked_tweets.order(created_at: :desc)
    options = { include: [:user], params: { current_user: } }
    render json: TweetBlueprint.render(bookmarks, root: :tweets, current_user: current_user), status: :ok
  end

  def create
    bookmark = current_user.bookmarks.new(tweet: @tweet)

    if bookmark.save
      render json: { message: 'Bookmark created' }, status: :created
    else
      render json: { errors: bookmark.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    bookmark = current_user.bookmarks.find_by(tweet: @tweet)
    if bookmark.destroy
      render json: { message: 'Bookmark removed' }, status: :ok
    else
      render json: { message: 'Bookmark not found' }, status: :unprocessable_entity
    end
  end

  private

  def set_tweet
    @tweet = Tweet.find(params[:tweet_id])
  rescue ActiveRecord::RecordNotFound
    render json: { errors: 'Tweet not found' }, status: :not_found
  end
end
