class User < ApplicationRecord
  has_secure_password

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :name, presence: true
  validate :validate_website_url

  # Validate website of user is a valid url
  def validate_website_url
    return if website.blank?

    uri = URI.parse(website)
    errors.add(:website, "is not a valid URL") unless uri.is_a?(URI::HTTP) || uri.is_a?(URI::HTTPS)
  rescue URI::InvalidURIError
    errors.add(:website, "must be a valid URL")
  end
end
