# frozen_string_literal: true

class JsonWebToken
  SECRET_KEY = Rails.application.credentials.secret_key_base.to_s
  ACCESS_SECRET = Rails.application.credentials.access_secret.to_s
  REFRESH_SECRET = Rails.application.credentials.refresh_secret.to_s

  def self.generate_access_token(user)
    filtered_payload = user_to_payload(user)
    encode(filtered_payload, 15.minutes.from_now, ACCESS_SECRET)
  end

  def self.generate_refresh_token(user)
    filtered_payload = user_to_payload(user)
    encode(filtered_payload, 7.days.from_now, REFRESH_SECRET)
  end

  # These 2 methods might not be necessary
  def self.decode_access_token(token)
    decode(token, ACCESS_SECRET)
  end

  def self.decode_refresh_token(token)
    decode(token, REFRESH_SECRET)
  end

  def self.encode(payload, exp = 24.hours.from_now, secret = SECRET_KEY)
    payload[:exp] = exp.to_i
    JWT.encode(payload, secret, "HS256")
  end

  def self.decode(token, secret = SECRET_KEY)
    decoded = JWT.decode(token, secret).first

    # Hashes the decoded payload
    HashWithIndifferentAccess.new decoded
  end

  private

  def self.user_to_payload(user)
    {
      user_id: user[:id],
      email: user[:email]
    }
  end
end
