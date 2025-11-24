class TweetBlueprint < ApplicationBlueprint
  identifier :id
  fields :text

  field(:total_likes) { |tweet| tweet.likes_count }
  field(:total_retweets) { |tweet| tweet.retweets_count }
  field(:total_comments) { |tweet| tweet.comments_count }

  field :liked do |tweet, params|
    params[:current_user].present? && tweet.likes.find_by_user_id(params[:current_user].id).present?
  end

  field :retweeted do |tweet, params|
    params[:current_user].present? && tweet.retweets.find_by_user_id(params[:current_user].id).present?
  end

  field :bookmarked do |tweet, params|
    params[:current_user].present? && tweet.bookmarked?(params[:current_user])
  end

  association :user, blueprint: UserBlueprint, default: {}
  association :attachments, blueprint: AttachmentBlueprint, default: []
end
