class UsersController < ApplicationController
  include Paginable
  before_action :set_user, only: %i[show update destroy follow_user]
  before_action :is_authenticated,
                only: %i[me update destroy following followers follow_user unfollow_user explore_users]
  before_action :check_owner, only: %i[update destroy]

  # GET /users
  def index
    @users = User.all
    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  def show_by_username
    @user = User.find_by(username: params[:username])
    if @user
      render json: UserSerializer.new(@user).serializable_hash.to_json
    else
      render json: { message: 'User not found' }, status: 404
    end
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
      render json: UserSerializer.new(@user).serializable_hash.to_json, status: :accepted
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
    @user = User.find_by(username: params[:username])
    if @user
      followers = @user.followers
      render json: UserSerializer.new(followers, { params: { current_user: @user } }), status: :ok
    else
      render json: { message: 'User not found' }, status: 404
    end
  end

  def following
    @user = User.find_by(username: params[:username])
    if @user
      following = @user.following
      render json: UserSerializer.new(following), status: :ok
    else
      render json: { message: 'User not found' }, status: 404
    end
  end

  def follow_user
    follow = Follower.new({ followed_user: @user, user_id: current_user.id })
    if follow.save
      NotificationService.create_notification(
        initiator: current_user,
        recipient: @user,
        action_text: "#{current_user.name} followed you."
      )
      render json: follow, status: :created
    else
      render json: follow.errors, status: :unprocessable_entity
    end
  end

  def unfollow_user
    followee = Follower.find_by(user_id: current_user.id, followed_user: params[:id])
    return unless followee.destroy

    render json: { message: 'User unfollowed' }, status: :ok
  end

  def explore_users
    # Return users that you are not following
    users = User.where.not(id: current_user.following.pluck(:id)).where.not(id: current_user.id).page(current_page).per(per_page)
    render json: UserSerializer.new(users), status: :ok
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
    params.require(:user).permit(:name, :bio, :location, :website, :birth_date, :banner_image, :profile_image)
  end

  def check_owner
    head :forbidden unless @user&.id == current_user&.id
  end
end
