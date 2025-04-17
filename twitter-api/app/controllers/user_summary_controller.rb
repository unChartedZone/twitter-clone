class UserSummaryController < ApplicationController
  include Paginable
  before_action :is_authenticated, only: %i[index]

  def index
    users = User.where.not(id: current_user.id).page(current_page).per(per_page)
    render json: UserSummarySerializer.new(users), status: :ok
  end
end
