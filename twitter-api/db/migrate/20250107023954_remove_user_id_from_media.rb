class RemoveUserIdFromMedia < ActiveRecord::Migration[6.1]
  def change
    remove_column "media", :user_id
  end
end
