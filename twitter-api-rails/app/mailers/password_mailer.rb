class PasswordMailer < ApplicationMailer
  CLIENT_URL = Rails.application.credentials.client_url.to_s

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.password_mailer.reset.subject
  #
  def reset
    @user = params[:user]
    @base_url = CLIENT_URL
    @token = @user.signed_id(purpose: 'password_reset', expires_in: 15.minutes)
    @password_reset_url = "#{@base_url}/password-reset?token=#{@token}"
    mail to: @user.email
  end
end
