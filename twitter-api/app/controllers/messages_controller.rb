class MessagesController < ApplicationController
  include Paginable
  before_action :is_authenticated, only: [:index, :create, :destroy]
  before_action :set_chat_thread, only: [:index, :create, :destroy]
  before_action :set_message, only: [:destroy]
  before_action :check_participant, only: [:index, :create, :destroy]

  def index
    messages = @chat_thread.chat_messages.includes(:user).order(created_at: :desc).page(current_page).per(per_page)
    render json: ChatMessageSerializer.new(messages, options(messages, 'messages_path')), status: :ok
  end

  def create
    @message = @chat_thread.chat_messages.new(message_params.merge(user: current_user))

    if @message.save
      ChatThreadChannel.broadcast_to(@chat_thread, {
        type: "message-created",
        message: ChatMessageSerializer.new(@message).serializable_hash.to_json
      })

      render json: @message, status: :created
    else
      render json: { errors: @message.errors.full_message }, status: :unprocessable_entity
    end
  end

  def destroy
    if @message.destroy
      ChatThreadChannel.broadcast_to(@chat_thread, { 
        type: "message-deleted",
        message: @message&.id.to_s 
      })
      head :no_content
    else
      render json: { message: 'Error deleting message' }, status: :bad_request
    end
  end

  private

  def set_chat_thread
    @chat_thread = ChatThread.find(params[:thread_id])
  end

  def set_message
    @message = ChatMessage.find(params[:id])
  end

  def check_participant
    unless ChatThreadParticipant.exists?(user_id: current_user.id, chat_thread_id: params[:thread_id] || @message&.chat_thread_id)
      render json: { error: "You do not have access to this thread" }, status: :forbidden
    end
  end

  def message_params
    params.require(:message).permit(:body)
  end

  def options(messages, path)
    get_links_serializer_options(path, messages)
  end
end
