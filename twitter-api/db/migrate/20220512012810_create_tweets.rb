class CreateTweets < ActiveRecord::Migration[6.1]
  def change
    create_table :tweets, id: :uuid do |t|
      t.string :text
      t.belongs_to :user, null: false, foreign_key: true, type: :uuid
      t.timestamps
    end
  end
end
