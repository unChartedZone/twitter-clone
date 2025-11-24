class PasswordController < ApplicationController

  def create
    if (@user = User.find_by(email: params[:email]))
      PasswordMailer.with(user: @user).reset.deliver_later
    end
    render json: { message: "If an account with that email was found, we have sent a link to reset the password." }, status: :ok
  end

  def valid_token
    @user = User.find_signed!(params[:token], purpose: :password_reset)
    head :ok
  rescue ActiveSupport::MessageVerifier::InvalidSignature
    head :bad_request
  end

  def update
    @user = User.find_signed!(update_params[:token], purpose: :password_reset)

    if update_params[:password] != update_params[:password_confirmation]
      return render json: { message: "Passwords do not match" }, status: :bad_request
    end

    @user.password = update_params[:password]
    if @user.save
      render json: { message: "Password changed successfully." }, status: :ok
    else
      render json: { message: "Failed to update user password, please try again later." }, status: :bad_request
    end
  rescue ActiveSupport::MessageVerifier::InvalidSignature
    render json: { message: "Expired token, please try again later." }, status: :bad_request
  end

  private

  def update_params
    params.permit([:token, :password, :password_confirmation])
  end
end
