class FixTweetColumns < ActiveRecord::Migration[6.1]
  def change
    remove_column :tweets, :total_likes, :integer, default: 0
    remove_column :tweets, :total_retweets, :integer, default: 0
    add_column :tweets, :likes_count, :integer, default: 0
    add_column :tweets, :retweets_count, :integer, default: 0
    add_column :tweets, :comments_count, :integer, default: 0
  end
end
