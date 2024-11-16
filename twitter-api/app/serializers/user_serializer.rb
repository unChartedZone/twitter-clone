class UserSerializer
  include JSONAPI::Serializer
  include ActionView

  set_key_transform :camel_lower

  attributes :id, :username, :email, :name, :bio, :email, :birth_date, :location, :website

  attribute :join_date do |object|
    object.created_at
  end

  attribute :total_tweets do |object|
    object.tweets_count
  end

  attribute :total_followers do |object|
    object.followers_count
  end

  attribute :total_following do |object|
    object.followings_count
  end

  attribute :profile_image do |object|
    if object.profile_image.present?
      Rails.application.routes.url_helpers.url_for(object.profile_image.representation(resize_to_limit: [500,
                                                                                                         500]).processed.url)
    end
  end

  attribute :banner_image do |object|
    if object.banner_image.present?
      Rails.application.routes.url_helpers.url_for(object.banner_image.representation(resize_to_limit: [1000,
                                                                                                        1000]).processed.url)
    end
  end

  attribute :access_token do |_object, params|
    params[:access_token]
  end

  cache_options store: Rails.cache, namespace: 'jsonapi-serializer', expires_in: 1.hour
end
