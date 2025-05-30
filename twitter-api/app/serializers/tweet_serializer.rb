# frozen_string_literal: true

class TweetSerializer
  include JSONAPI::Serializer
  include DateHelper

  set_key_transform :camel_lower

  has_many :medium, attributes: [:description]
  belongs_to :user

  attributes :id, :text, :created_at

  attribute :medium do |object|
    object.medium.each do |o|
      o.url = o.media_url
    end
  end

  attribute :total_likes do |object|
    object.likes_count
  end

  attribute :total_retweets do |object|
    object.retweets_count
  end

  attribute :total_comments do |object|
    object.comments_count
  end

  attribute :liked do |object, params|
    params[:current_user].present? && object.likes.find_by_user_id(params[:current_user].id).present?
  end

  attribute :retweeted do |object, params|
    params[:current_user].present? && object.retweets.find_by_user_id(params[:current_user].id).present?
  end

  attribute :bookmarked do |object, params|
    params[:current_user].present? && object.bookmarked?(params[:current_user])
  end

  attribute :user do |tweet|
    UserSummarySerializer.new(tweet.user).serializable_hash[:data][:attributes]
  end

  cache_options store: Rails.cache, namespace: 'twitter-api', expires_in: 1.hour
end
