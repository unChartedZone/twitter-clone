class CreateTweetLikes < ActiveRecord::Migration[6.1]
  def change
    create_table :tweet_likes do |t|
      t.belongs_to :like, null: false, foreign_key: true, type: :uuid
      t.belongs_to :tweet, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
