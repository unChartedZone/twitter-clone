class CommentsController < ApplicationController
  before_action :set_tweet, only: [:create]
  before_action :is_authenticated, only: [:index, :create, :destroy]

  def index
    comments = Comment.includes([:user, :comment_media]).where(tweet_id: params[:tweet_id])
    render json: CommentSerializer.new(comments).serializable_hash.to_json, status: :ok
  end

  def create
    comment = Comment.new(comment_params)
    comment.user = current_user
    comment.tweet = @tweet

    if comment.save
      NotificationService.create_notification(
        initiator: current_user,
        recipient: @tweet.user,
        action_text: "#{current_user.name} commented on your tweet."
      )
      render json: CommentSerializer.new(comment).serializable_hash.to_json, status: :created
    else
      render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # /comments/id
  def destroy
    comment = Comment.find(params[:id])
    if comment.destroy
      render head: :no_content
    else
      render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:content, comment_media_attributes: [:alt_text, :attachment])
  end

  def set_tweet
    @tweet = Tweet.find(params[:tweet_id])
  rescue ActiveRecord::RecordNotFound
    render json: { errors: 'Tweet not found' }, status: :not_found
  end
end
