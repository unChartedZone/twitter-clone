class CreateCommentMedia < ActiveRecord::Migration[6.1]
  def change
    create_table :comment_media, id: :uuid do |t|
      t.string :alt_text
      t.belongs_to :comment, null: true, foreign_key: true, type: :uuid
      t.timestamps
    end
  end
end
