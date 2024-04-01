class TweetSerializer
  include JSONAPI::Serializer
  include ActionView

  has_many :medium, attributes: [:description]
  belongs_to :user
  attributes :text, :total_likes
  attribute :medium do |object|
    object.medium.each do |o|
      if o.image.present?
        o.url = Rails.application.routes.url_helpers.url_for(o.image)
      end
    end
  end

  attribute :liked do |object|
    object.likes.find_by_user_id(object.user_id).present?
  end

  cache_options store: Rails.cache, namespace: 'jsonapi-serializer', expires_in: 1.hour
end