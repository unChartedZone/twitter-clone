class MessagesController < ApplicationController
  before_action :is_authenticated, only: [:index, :create]

  def index
    chat_thread = ChatThread.find(params[:chat_thread_id])

    unless chat_thread.users.exists?(current_user.id)
      return render json: { error: "You do not have access to this thread" }, status: :forbidden
    end

    messages = chat_thread.chat_messages.includes(:user).order(created_at: :asc)
    render json: messages, status: :ok
  end

  def create
    @chat_thread = ChatThread.find(params[:chat_thread_id])
    @message = @chat_thread.chat_messages.new(message_params.merge(user: current_user))

    if @message.save
      ChatThreadChannel.broadcast_to(@chat_thread, {
        message: @message.to_json
      })

      render json: @message, status: :created
    else
      render json: { errors: @message.errors.full_message }, status: :unprocessable_entity
    end
  end

  private

  def message_params
    params.require(:message).permit(:body)
  end

end
