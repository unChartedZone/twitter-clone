class CreateRetweets < ActiveRecord::Migration[8.0]
  def change
    create_table :retweets, id: :uuid do |t|
      t.belongs_to :user, null: false, foreign_key: true, type: :uuid
      t.belongs_to :tweet, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
