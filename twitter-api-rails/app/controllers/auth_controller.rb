class AuthController < ApplicationController
  DOMAIN = Rails.application.credentials.domain.to_s

  def signup
    @user = User.create(user_params)

    if !@user.save
      render json: @user.errors, status: :unprocessable_entity
    else
      access_token = JsonWebToken.generate_access_token(@user)
      refresh_token = JsonWebToken.generate_refresh_token(@user)
      set_refresh_token_cookie(refresh_token)
      Rails.logger.info 'Signing up user #{@user.username}'
      render json: { user: @user, meta: { accessToken: access_token } }
    end
  end

  def login
  end

  def refresh_session
  end

  def logout
  end

  private

  def set_refresh_token_cookie(token)
    cookies[:refresh_token] = {
      value: token,
      httponly: true,
      secure: true,
      expires: 7.days.from_now,
      domain: DOMAIN,
      path: "/"
    }
  end

end
