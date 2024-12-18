class FixLikes < ActiveRecord::Migration[6.1]
  def change
    drop_table :tweet_likes
    add_belongs_to :likes, :tweet, null: false, foreign_key: true, type: :uuid
  end
end
