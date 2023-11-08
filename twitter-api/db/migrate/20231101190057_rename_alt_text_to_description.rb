class RenameAltTextToDescription < ActiveRecord::Migration[6.1]
  def change
    rename_column :media, :alt_text, :description
  end
end
