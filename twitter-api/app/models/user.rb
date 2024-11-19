class User < ApplicationRecord
  include ActionView::Helpers::AssetUrlHelper
  has_secure_password

  validates :email, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :username, presence: true, uniqueness: true
  validates :name, presence: true
  validate :validate_website_url

  has_many :tweets, dependent: :destroy
  has_many :media, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :retweets, dependent: :destroy
  has_many :followers
  has_many :follower_relationships, foreign_key: 'followed_user', class_name: 'Follower'
  has_many :followers, through: :follower_relationships, source: :user
  has_many :following_relationships, foreign_key: 'user_id', class_name: 'Follower'
  has_many :following, through: :following_relationships, source: :followed_user
  has_one_attached :profile_image
  has_one_attached :banner_image

  # Remove password from user json serialization
  def as_json(_options = {})
    super(except: [:password_digest])
  end

  def profile_image_url
    if profile_image.attached?
      Rails.application.routes.url_helpers.url_for(profile_image.representation(resize_to_limit: [500,
                                                                                                  500]).processed.url)
    else
      image_url('default-pfp.png')
    end
  end

  def banner_image_url
    if banner_image.attached?
      Rails.application.routes.url_helpers.url_for(banner_image.representation(resize_to_limit: [1000,
                                                                                                 1000]).processed.url)
    else
      '/images/default-banner.avif'
    end
  end

  private

  def validate_website_url
    return if website.blank?

    uri = URI.parse(website)
    errors.add(:website, 'is not a valid URL') unless uri.is_a?(URI::HTTP) || uri.is_a?(URI::HTTPS)
  rescue URI::InvalidURIError
    errors.add(:website, 'must be a valid URL')
  end
end
