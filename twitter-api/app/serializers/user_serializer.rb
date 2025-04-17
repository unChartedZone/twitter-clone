class UserSerializer
  include JSONAPI::Serializer
  include ActionView

  set_key_transform :camel_lower

  attributes :id, :username, :email, :name, :bio, :email, :birth_date, :location, :website

  attribute :join_date, &:created_at

  attribute :total_tweets, &:tweets_count

  attribute :total_followers, &:followers_count

  attribute :total_following, &:followings_count

  attribute :profile_image, &:profile_image_url

  attribute :banner_image, &:banner_image_url

  attribute :isFollowing do |object, params|
    params[:current_user].present? && params[:current_user].following.find(object.id).present?
  rescue ActiveRecord::RecordNotFound
    false
  end

  cache_options store: Rails.cache, namespace: 'twitter-api', expires_in: 1.hour
end
