class AuthController < ApplicationController
  require 'jwt'

  def signup
    @user = User.new(user_params)

    if @user.save
      access_token = JsonWebToken.generate_access_token(@user)
      refresh_token = JsonWebToken.generate_refresh_token(@user)

      set_refresh_token_cookie(refresh_token)

      render json: {access_token: access_token, user: @user}, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def login
    @user = User.find_by(email: login_params[:email])

    unless @user.authenticate(login_params[:password])
      return render json: { message: 'Username or Password was incorrect.' }, status: :unauthorized
    end

    access_token = JsonWebToken.generate_access_token(@user)
    refresh_token = JsonWebToken.generate_refresh_token(@user)

    set_refresh_token_cookie(refresh_token)

    render json: { access_token: access_token, user: @user }
  end

  def refresh_current_token
    # Grab refresh token from request cookies
    refresh_token = cookies[:refresh_token]

    # If there isn't a refresh token cookie, then send back unauthorized response
    unless refresh_token
      return render json: { access_token: '' }, status: :unauthorized
    end

    begin
      decoded_refresh_token = JsonWebToken.decode_refresh_token(refresh_token)
    rescue JWT::DecodeError
      Rails.logger.warn 'Error decoding refresh jwt'
      set_refresh_token_cookie('') # set an empty refresh token in the cookie
      return render json: { message: 'SUPER NOT AUTHORIZED', access_token: '' }, status: :unauthorized
    end

    user_id = decoded_refresh_token['user_id']
    @user = User.find(user_id)

    access_token = JsonWebToken.generate_access_token(@user)
    refresh_token = JsonWebToken.generate_refresh_token(@user)

    set_refresh_token_cookie(refresh_token)

    render json: { access_token: access_token, user: @user, message: 'Refreshed Token!' }
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
      Rails.logger.warn 'Error decoding jwt'
      return render json: { message: 'Really not AUTHORIZED', access_token: '' }, status: :unauthorized
    end

    payload = decoded_access_token[0]
    user_id = payload['user_id']
    user = User.find(user_id)

    render json: { user: user, message: 'Authorized' }
  end

  def set_refresh_token_cookie(token)
    cookies[:refresh_token] = {
      value: token,
      httponly: true,
      secure: true,
      expires: 7.days.from_now
    }
  end

  # Filter parameters for new user request
  def user_params
    params.require(:user).permit(:username, :email, :password, :name)
  end

  def login_params
    params.require(:user).permit(:email, :password)
  end
end