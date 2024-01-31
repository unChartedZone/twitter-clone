class AddColumnsToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :website, :string
    add_column :users, :location, :string
    add_column :users, :bio, :text
    add_column :users, :date_of_birth, :date
  end
end
