class TweetSerializer
  include JSONAPI::Serializer
  include ActionView

  set_key_transform :camel_lower

  has_many :medium, attributes: [:description]
  belongs_to :user, attributes: [:username]

  attributes :text, :total_likes, :total_retweets

  attribute :medium do |object|
    object.medium.each do |o|
      if o.image.present?
        o.url = Rails.application.routes.url_helpers.url_for(o.image)
      end
    end
  end

  attribute :liked do |object, params|
    params[:current_user].present? && object.likes.find_by_user_id(params[:current_user].id).present?
  end

  attribute :retweeted do |object, params|
    params[:current_user].present? && object.retweets.find_by_user_id(params[:current_user].id).present?
  end

  cache_options store: Rails.cache, namespace: 'jsonapi-serializer', expires_in: 1.hour
end
