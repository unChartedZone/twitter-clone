class ChangeTypesOfTotalsInTweets < ActiveRecord::Migration[6.1]
  def change
    change_column :tweets, :total_likes, :integer
    change_column :tweets, :total_retweets, :integer
  end
end
