class CreateBookmarks < ActiveRecord::Migration[6.1]
  def change
    create_table :bookmarks, id: :uuid do |t|
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.references :tweet, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
