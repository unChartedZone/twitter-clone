class RemoveTweetMediaMiddleModel < ActiveRecord::Migration[6.1]
  def change
    remove_foreign_key "media", "users"
    drop_table :tweet_media
  end
end
