class ChatThreadChannel < ApplicationCable::Channel
  def subscribed
    @chat_thread = ChatThread.find(params[:thread_id])
    stream_for @chat_thread
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
