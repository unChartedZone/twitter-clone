# frozen_string_literal: true

class CommentMediumSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower
  set_type :comment_media
  belongs_to :comment
  attributes :id, :alt_text
  attribute :media_url do |object|
    object.attachment_url
  end

  cache_options store: Rails.cache, namespace: 'jsonapi-serializer', expires_in: 1.hour
end
