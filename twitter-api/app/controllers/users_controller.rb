class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]
  before_action :is_authenticated, only: [:me, :update_image]
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

  def update_image
    field = update_image_params[:field]
    image = update_image_params[:image]

    if ['banner_image', 'profile_image'].include?(field)
      if field == 'banner_image'
        @current_user.banner_image.attach(image)
      else
        @current_user.profile_image.attach(image)
      end

      if @current_user.save
        render json: UserSerializer.new(@current_user)
      else
        render json: { errors: @current_user.errors }, status: :bad_request
      end
    else
      render json: { message: "Invalid image field specified" }, status: :bad_request
    end
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
    params.require(:user).permit(:name, :banner_image, :date_of_birth, :location)
  end

  def update_image_params
    params.permit(:field, :image)
  end

  def check_owner
    head :forbidden unless @user.id == current_user&.id
  end
end
