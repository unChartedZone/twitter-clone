class ChatMessage < ApplicationRecord
  belongs_to :user
  belongs_to :chat_thread

  validates :body, presence: true
end
