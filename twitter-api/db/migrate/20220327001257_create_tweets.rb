class CreateTweets < ActiveRecord::Migration[6.1]
  def change
    create_table :tweets do |t|
      t.string :text
      t.references :user_id, null: false, foreign_key: true

      t.timestamps
    end
  end
end
