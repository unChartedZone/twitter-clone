class AuthController < ApplicationController
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
    if @user.authenticate(login_params[:password])
      render json: { message: "passwords match" }
    else
      render json: { message: "Username/Password does not match." }
    end
  end

  def generate_jwt
  end

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end

  def login_params
    params.require(:user).permit(:email, :password)
  end
end