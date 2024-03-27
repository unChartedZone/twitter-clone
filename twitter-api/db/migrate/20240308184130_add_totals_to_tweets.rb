class AddTotalsToTweets < ActiveRecord::Migration[6.1]
  def change
    add_column :tweets, :total_likes, :decimal, :default => 0
    add_column :tweets, :total_retweets, :decimal, :default => 0
  end
end
