class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy, :follow_user]
  before_action :is_authenticated, only: [:me, :update, :destroy, :following, :followers, :follow_user, :explore_users]
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

  def followers
    followers = @current_user.followers
    render json: UserSerializer.new(followers), status: :ok
  end

  def following
    following = @current_user.following
    render json: UserSerializer.new(following), status: :ok
  end

  def follow_user
    follow = Follower.new({ followed_user: @user, user_id: current_user.id })
    if follow.save && @current_user.save && @user.save # this feels stupid...
      render json: follow, status: :created
    else
      render json: follow.errors, status: :unprocessable_entity
    end
  end

  def explore_users
    # Return users that you are not following
    users = User.where.not(id: current_user.following.pluck(:id)).where.not(id: current_user.id)
    render json: UserSerializer.new(users), status: :ok
  end

  # TODO: create unfollow user endpoint

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
    params.require(:user).permit(:name, :bio, :location, :website, :birth_date, :banner_image, :profile_image)
  end

  def check_owner
    head :forbidden unless @user&.id == current_user&.id
  end
end
