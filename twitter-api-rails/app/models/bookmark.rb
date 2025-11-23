class Bookmark < ApplicationRecord
  belongs_to :user
  belongs_to :tweet
  validates :tweet_id, uniqueness: { scope: :user_id, message: "You have already bookmarked this tweet" }
end
