class AuthSerializer
  include JSONAPI::Serializer
  include ActionView

  set_key_transform :camel_lower

  attributes :id, :email, :username, :name
  attribute :profile_image do |object|
    if object.profile_image.present?
      Rails.application.routes.url_helpers.url_for(object.profile_image.representation(resize_to_limit: [500, 500]).processed.url)
    end
  end

  attribute :banner_image do |object|
    if object.banner_image.present?
      Rails.application.routes.url_helpers.url_for(object.banner_image.representation(resize_to_limit: [1000, 1000]).processed.url)
    end
  end

  attribute :access_token do |object, params|
    params[:access_token]
  end

end
