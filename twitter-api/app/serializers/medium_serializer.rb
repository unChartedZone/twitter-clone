class MediumSerializer
  include JSONAPI::Serializer

  belongs_to :user
  attributes :description
  attribute :url do |object|
    Rails.application.routes.url_helpers.url_for(object.image)
  end

  cache_options store: Rails.cache, namespace: 'jsonapi-serializer', expires_in: 1.hour
end