# frozen_string_literal: true

class UserSummarySerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower
  set_type :user

  attributes :id, :name, :username, :profile_image_url

  # cache_options store: Rails.cache, namespace: 'jsonapi-serializer', expires_in: 1.hour
end
