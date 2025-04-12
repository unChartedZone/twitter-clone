class CreateChatThreadParticipants < ActiveRecord::Migration[6.1]
  def change
    create_table :chat_thread_participants, id: :uuid do |t|
      t.belongs_to :user, null: false, foreign_key: true, type: :uuid
      t.belongs_to :chat_thread, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
