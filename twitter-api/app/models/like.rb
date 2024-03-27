class Like < ApplicationRecord
  belongs_to :user
  has_many :tweet_likes, dependent: :destroy
  has_many :tweets, through: :tweet_likes
end
