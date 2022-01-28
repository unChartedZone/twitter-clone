class User < ApplicationRecord
  has_secure_password
  validates :email, presence: true, uniqueness: true

  # Remove password from user json serialization
  def as_json(options = {})
    super(except: [:password_digest])
  end
end
