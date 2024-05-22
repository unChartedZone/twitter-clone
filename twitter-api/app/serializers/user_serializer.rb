class UserSerializer
  include JSONAPI::Serializer
  include ActionView

  set_key_transform :camel_lower

  attributes :username, :name, :email, :bio, :date_of_birth
  attribute :profile_image do |object|
    if object.profile_image.present?
      Rails.application.routes.url_helpers.url_for(object.profile_image.representation(resize_to_limit: [300, 300]).processed.url)
    end
  end

  attribute :banner_image do |object|
    if object.banner_image.present?
      Rails.application.routes.url_helpers.url_for(object.banner_image.representation(resize_to_limit: [1000, 1000]).processed.url)
    end
  end

  cache_options store: Rails.cache, namespace: 'jsonapi-serializer', expires_in: 1.hour
end
