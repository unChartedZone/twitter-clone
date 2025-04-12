class ChatThreadsController < ApplicationController
  include Paginable
  before_action :is_authenticated, only: %i[index create]

  # Fetch chat threads for authenticated user
  def index
    threads = current_user.chat_threads.includes(users: :profile_image_attachment)
    render json: ChatThreadSerializer.new(threads, { params: { current_user_id: current_user.id } }).serializable_hash.to_json, status: :ok
  end

  # Create new chat thread
  def create
    participant_ids = params[:user_ids].uniq
    participant_ids << current_user.id unless participant_ids.include?(current_user.id)
    chat_thread = ChatService.new.create_thread(participant_ids)
    render json: chat_thread, status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.message }, status: :unprocessable_entity
  end
end
