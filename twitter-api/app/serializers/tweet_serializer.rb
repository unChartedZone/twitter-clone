class TweetSerializer
  include JSONAPI::Serializer
  include ActionView

  has_many :medium, attributes: [:description]
  belongs_to :user
  attributes :text
  attribute :medium do |object|
    object.medium.each do |o|
      if o.image.present?
        o.url = Rails.application.routes.url_helpers.url_for(o.image)
      end
    end
  end

  cache_options store: Rails.cache, namespace: 'jsonapi-serializer', expires_in: 1.hour
end