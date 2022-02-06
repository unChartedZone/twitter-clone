class AuthController < ApplicationController
  require 'jwt'

  before_action :setup_env

  def setup_env
    @access_secret = ENV['ACCESS_SECRET']
    # @refresh_secret = Rails.configuration.x.refresh_secret
    @refresh_secret = ENV['REFRESH_SECRET']
  end

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

    render json: { access_token: access_token, user: @user }
  end
  def user
    pattern = /^Bearer /
    header  = request.headers['Authorization']

    # If they don't have an access token, then they're not authorized
    unless header && header.match(pattern)
      return render json: { message: 'Not authorized'}, status: :unauthorized
    end

    access_token = header.gsub(pattern, '')

    begin
      decoded_access_token = JWT.decode access_token, @access_secret, true
    rescue JWT::DecodeError
      Rails.logger.warn  'Error decoding jwt'
      return render json: {message: 'Really not AUTHORIZED', access_token: ''}, status: :unauthorized
    end

    payload = decoded_access_token[0]
    user_id = payload['user_id']
    user = User.find(user_id)

    render json: { user: user, message: 'Authorized' }
  end

  def generate_access_jwt(payload)
    JWT.encode(payload, @access_secret, 'HS256')
    end

  def generate_refresh_token(payload)
    JWT.encode(payload, @refresh_secret, 'HS256')
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