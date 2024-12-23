class CreateNotifications < ActiveRecord::Migration[6.1]
  def change
    create_table :notifications, id: :uuid do |t|
      t.string :text, null: false
      # User that triggered notification
      t.references :initiator, null: false, foreign_key: { to_table: :users }, type: :uuid
      # recipient of notification
      t.references :recipient, null: false, foreign_key: { to_table: :users }, type: :uuid
      t.boolean :read, default: false
      t.timestamps
    end
  end
end
