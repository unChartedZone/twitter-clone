class CreateChatMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :chat_messages, id: :uuid do |t|
      t.text :body
      t.belongs_to :user, null: false, foreign_key: true, type: :uuid
      t.belongs_to :chat_thread, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
