module Authenticable
  def current_user
    return @current_user if @current_user

    header = request.headers["Authorization"]
    return nil if header.nil? # Return nil if there is no Authorization header

    pattern = /^Bearer /
    access_token = header.gsub(pattern, "") # Remove Bearer from auth header value

    begin
      decoded = JsonWebToken.decode_access_token(access_token)
    rescue JWT::DecodeError => _e
      return head :unauthorized
    end
    @current_user = User.find(decoded[:user_id]) rescue ActiveRecord::RecordNotFound
  end

  protected

  def is_authenticated
    head :unauthorized unless self.current_user
  end
end
