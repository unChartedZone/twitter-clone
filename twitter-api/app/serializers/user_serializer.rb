class UserSerializer
  include JSONAPI::Serializer
  include ActionView

  set_key_transform :camel_lower

  attributes :username, :name, :email, :date_of_birth
  attribute :profile_image do |object|
    if object.profile_image.present?
      Rails.application.routes.url_helpers.url_for(object.profile_image)
    end
  end

  cache_options store: Rails.cache, namespace: 'jsonapi-serializer', expires_in: 1.hour
end
