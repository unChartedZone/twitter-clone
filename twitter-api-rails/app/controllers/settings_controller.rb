# frozen_string_literal: true

class SettingsController < ApplicationController
  before_action :is_authenticated, only: [:change_password]

  def change_password
    if !current_user.authenticate(password_params[:current_password])
      render json: { message: "Invalid password." }, status: :forbidden
    elsif password_params[:new_password] != password_params[:confirm_password]
      render json: { message: "New passwords do not match." }, status: :unprocessable_entity
    else
      current_user.password = password_params[:new_password]
      if current_user.save
        render json: UserBlueprint.render(current_user), status: :accepted
      end
    end
  end

  private

  def password_params
    params.permit(:current_password, :new_password, :confirm_password)
  end
end
