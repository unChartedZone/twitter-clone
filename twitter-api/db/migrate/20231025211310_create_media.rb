class CreateMedia < ActiveRecord::Migration[6.1]
  def change
    create_table :media, id: :uuid do |t|
      t.string :url
      t.string :alt_text
      t.belongs_to :user, null: false, foreign_key: true, type: :uuid
      t.timestamps
    end
  end
end
