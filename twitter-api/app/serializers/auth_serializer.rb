class AuthSerializer
  include JSONAPI::Serializer
  include ActionView

  set_key_transform :camel_lower

  attributes :id, :email, :username, :name
  attribute :profile_image do |object|
    if object.profile_image.present?
      Rails.application.routes.url_helpers.url_for(object.profile_image)
    end
  end

  attribute :access_token do |object, params|
    params[:access_token]
  end

end