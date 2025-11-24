class ChatThread < ApplicationRecord
  has_many :chat_messages, dependent: :destroy
  has_many :chat_thread_participants, dependent: :destroy
  has_many :users, through: :chat_thread_participants
end
