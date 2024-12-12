# frozen_string_literal: true

class CommentSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower

  belongs_to :user, serializer: UserSummarySerializer
  has_many :comment_media, serializer: CommentMediumSerializer

  attributes :id, :content, :created_at

  attribute :user do |comment|
    UserSummarySerializer.new(comment.user).serializable_hash[:data][:attributes]
  end

  # Custom method for serializing the comment_media objects
  attribute :comment_media do |comment|
    comment.comment_media.map do |media|
      CommentMediumSerializer.new(media).serializable_hash[:data][:attributes]
    end
  end

  cache_options store: Rails.cache, namespace: 'jsonapi-serializer', expires_in: 1.hour
end
