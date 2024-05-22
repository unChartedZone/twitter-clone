class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]
  before_action :is_authenticated, only: [:me, :update, :destroy, :update_image]
  before_action :check_owner, only: [:update, :destroy]

  # GET /users
  def index
    @users = User.all
    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(update_user_params)
      render json: UserSerializer.new(@user)
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  def me
    render json: UserSerializer.new(@current_user)
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation)
  end

  def update_user_params
    params.require(:user).permit(:name, :bio, :location, :username, :date_of_birth, :banner_image, :profile_image)
  end

  def check_owner
    head :forbidden unless @user&.id == current_user&.id
  end
end
