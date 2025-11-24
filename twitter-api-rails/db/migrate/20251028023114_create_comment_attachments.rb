class CreateCommentAttachments < ActiveRecord::Migration[8.0]
  def change
    create_table :comment_attachments, id: :uuid do |t|
      t.string :alt_text
      t.belongs_to :comment, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
