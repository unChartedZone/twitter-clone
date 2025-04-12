class ChatThreadParticipant < ApplicationRecord
  belongs_to :user
  belongs_to :chat_thread

  validates :user_id, uniqueness: { scope: :chat_thread_id }
end
