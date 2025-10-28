class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users, id: :uuid do |t|
      t.string :username
      t.string :email
      t.string :password_digest
      t.string :name
      t.string :bio
      t.string :website
      t.string :location
      t.date   :birth_date
      t.integer :tweets_count, default: 0
      t.integer :followings_count, default: 0
      t.integer :followers_count, default: 0

      t.index :username, unique: true
      t.index :email, unique: true

      t.timestamps
    end
  end
end
