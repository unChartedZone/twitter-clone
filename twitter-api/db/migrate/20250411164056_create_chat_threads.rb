class CreateChatThreads < ActiveRecord::Migration[6.1]
  def change
    create_table :chat_threads, id: :uuid do |t|
      t.timestamps
    end
  end
end
