# frozen_string_literal: true

class ChatMessageSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower

  belongs_to :user

  attributes :id, :body, :created_at

  attribute :user do |message|
    UserSummarySerializer.new(message.user).serializable_hash[:data][:attributes]
  end

  cache_options store: Rails.cache, namespace: 'twitter-api', expires_in: 1.hour
end
