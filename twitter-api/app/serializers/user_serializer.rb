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
    object.profile_image_url
  end

  attribute :banner_image do |object|
    object.banner_image_url
  end

  attribute :access_token do |_object, params|
    params[:access_token]
  end

  cache_options store: Rails.cache, namespace: 'jsonapi-serializer', expires_in: 1.hour
end
