# frozen_string_literal: true

class NotificationsController < ApplicationController
  include Paginable
  before_action :is_authenticated, only: [:index]

  def index
    notifications = Notification.where(recipient_id: current_user)
                                .order(created_at: :desc)
                                .page(current_page)
                                .per(per_page)
    render json: NotificationBlueprint.render(notifications, root: :notifications), status: :ok
  end

end
