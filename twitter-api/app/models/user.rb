class User < ApplicationRecord
  has_secure_password
  validates :email, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :username, presence: true
  validates :name, presence: true

  has_many :tweets, dependent: :destroy

  # Remove password from user json serialization
  def as_json(options = {})
    super(except: [:password_digest])
  end
end
