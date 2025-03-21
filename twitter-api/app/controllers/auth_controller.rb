class AuthController < ApplicationController
  require 'jwt'
  DOMAIN = Rails.application.credentials.domain.to_s
  ACCESS_SECRET = Rails.application.credentials.access_secret.to_s
  REFRESH_SECRET = Rails.application.credentials.refresh_secret.to_s

  def signup
    @user = User.create(user_params)

    if !@user.save
      render json: @user.errors, status: :unprocessable_entity
    else
      access_token = JsonWebToken.generate_access_token(@user)
      refresh_token = JsonWebToken.generate_refresh_token(@user)
      set_refresh_token_cookie(refresh_token)
      Rails.logger.info 'Signing up user #{@user.username}'
      options = { meta: { accessToken: access_token } }
      render json: UserSerializer.new(@user, options), status: :created
    end
  end

  def login
    @user = User.where(username: login_params[:username]).or(User.where(email: login_params[:email])).first
    unless @user&.authenticate(login_params[:password])
      return render json: { message: 'Username or Password was incorrect.' }, status: :unauthorized
    end

    access_token = JsonWebToken.generate_access_token(@user)
    refresh_token = JsonWebToken.generate_refresh_token(@user)
    set_refresh_token_cookie(refresh_token)
    Rails.logger.info "Logging in user #{@user.username}"
    options = { meta: { accessToken: access_token } }
    render json: UserSerializer.new(@user, options)
  end

  def refresh_current_token
    Rails.logger.info('Refreshing token for user')
    # Grab refresh token from request cookies
    refresh_token = cookies[:refresh_token]

    # If there isn't a refresh token cookie, then send back unauthorized response
    return render json: { access_token: '' }, status: :unauthorized unless refresh_token

    begin
      decoded_refresh_token = JsonWebToken.decode_refresh_token(refresh_token)
    rescue JWT::DecodeError
      Rails.logger.warn 'Error decoding refresh jwt'
      set_refresh_token_cookie('') # set an empty refresh token in the cookie
      return render json: { message: 'Not authorized', access_token: '' }, status: :unauthorized
    end

    user_id = decoded_refresh_token['user_id']
    @user = User.find(user_id)

    access_token = JsonWebToken.generate_access_token(@user)
    refresh_token = JsonWebToken.generate_refresh_token(@user)

    set_refresh_token_cookie(refresh_token)
    options = { meta: { accessToken: access_token } }
    render json: UserSerializer.new(@user, options).serializable_hash.to_json,
           status: :ok
  end

  def logout
    set_refresh_token_cookie('') # Clear refresh session token
    render status: :no_content
  end

  private

  def set_refresh_token_cookie(token)
    cookies[:refresh_token] = {
      value: token,
      httponly: true,
      secure: true,
      expires: 7.days.from_now,
      domain: DOMAIN,
      path: '/'
    }
  end

  # Filter parameters for new user request
  def user_params
    params.require(:user).permit(:username, :email, :password, :name, :birth_date)
  end

  def login_params
    params.require(:user).permit(:email, :username, :password)
  end
end
