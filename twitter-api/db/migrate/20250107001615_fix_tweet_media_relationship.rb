class FixTweetMediaRelationship < ActiveRecord::Migration[6.1]
  def change
    add_belongs_to :media, :tweet, null: false, foreign_key: true, type: :uuid
  end
end
