class CreateTweetMedia < ActiveRecord::Migration[6.1]
  def change
    create_table :tweet_media do |t|
      t.belongs_to :tweet, null: false, foreign_key: true, type: :uuid
      t.belongs_to :medium, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
