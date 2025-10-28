class CreateTweets < ActiveRecord::Migration[8.0]
  def change
    create_table :tweets, id: :uuid do |t|
      t.string :text
      t.integer :likes_count, default: 0
      t.integer :retweets_count, default: 0
      t.belongs_to :user, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
