class User < ApplicationRecord
  include ActionView::Helpers::AssetUrlHelper

  has_secure_password
  has_one_attached :profile_image
  has_one_attached :banner_image

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :name, presence: true
  validate :validate_website_url

  has_many :tweets, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :retweets, dependent: :destroy
  has_many :bookmarks, dependent: :destroy
  has_many :bookmarked_tweets, through: :bookmarks, source: :tweet
  has_many :followers
  has_many :follower_relationships, foreign_key: "followed_user", class_name: "Follower"
  has_many :followers, through: :follower_relationships, source: :user
  has_many :following_relationships, foreign_key: "user_id", class_name: "Follower"
  has_many :following, through: :following_relationships, source: :followed_user
  has_many :comments, dependent: :destroy
  has_many :chat_thread_participants
  has_many :chat_threads, through: :chat_thread_participants

  def profile_image_url
    if profile_image.attached?
      Rails.application.routes.url_helpers.url_for(profile_image.variant(resize_to_limit: [ 150, 150 ], format: :jpg))
    else
      image_url("default-pfp.png")
    end
  end

  def banner_image_url
    if banner_image.attached?
      Rails.application.routes.url_helpers.url_for(banner_image.variant(resize_to_limit: [ 650, 650 ], format: :jpg))
    else
      "/images/default-banner.avif"
    end
  end

  # Validate website of user is a valid url
  def validate_website_url
    return if website.blank?

    uri = URI.parse(website)
    errors.add(:website, "is not a valid URL") unless uri.is_a?(URI::HTTP) || uri.is_a?(URI::HTTPS)
  rescue URI::InvalidURIError
    errors.add(:website, "must be a valid URL")
  end
end
