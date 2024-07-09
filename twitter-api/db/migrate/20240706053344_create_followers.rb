class CreateFollowers < ActiveRecord::Migration[6.1]
  def change
    create_table :followers, id: :uuid do |t|
      t.belongs_to :user, null: false, foreign_key: true, type: :uuid
      t.uuid :followed_user

      t.timestamps
    end
  end
end
