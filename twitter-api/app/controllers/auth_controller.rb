class AuthController < ApplicationController
  require 'jwt'

  def signup
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def login
    @user = User.find_by(email: login_params[:email])

    # User not registered, maybe this could be a security vulnerability?
    unless @user
      return render json: { message: 'Username not registered.' }, status: :unauthorized
    end

    # If passwords don't match then auth fails
    unless @user.authenticate(login_params[:password])
      return render json: { message: 'Username or Password was incorrect.' }, status: :unauthorized
    end

    payload = { user_id: @user.id, email: @user.email, exp: Time.now.to_i + 15 * 60 }
    access_token = generate_access_jwt(payload)
    refresh_token = generate_refresh_token(payload)
    # set_refresh_token_cookie(refresh_token)
    cookies[:refresh_token] = {
      value: refresh_token,
      httponly: true,
      secure: true,
      expires: 7.days.from_now
    }

    render json: { access_token: access_token }
  end

  def generate_access_jwt(payload)
    access_secret = Rails.configuration.x.access_secret

    JWT.encode(payload, access_secret, 'HS256')
    end

  def generate_refresh_token(payload)
    refresh_secret = Rails.configuration.x.refresh_secret

    JWT.encode(payload, refresh_secret, 'HS256')
  end

  def set_refresh_token_cookie(token)
    cookies[:refresh_token] = {
      value: token,
      httponly: true,
      secure: true,
      expires: 7.days.from_now
    }
  end

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end

  def login_params
    params.require(:user).permit(:email, :password)
  end
end