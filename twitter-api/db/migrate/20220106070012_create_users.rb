class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users, id: :uuid do |t|
      t.string :username
      t.index :username, unique: true
      t.string :email
      t.index :email, unique: true
      t.string :password_digest, null: false
      t.string :name
      t.timestamps
    end
  end
end
