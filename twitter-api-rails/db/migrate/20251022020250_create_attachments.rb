class CreateAttachments < ActiveRecord::Migration[8.0]
  def change
    create_table :attachments, id: :uuid do |t|
      t.string :alt_text
      t.belongs_to :tweet, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
