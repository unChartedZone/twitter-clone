class TweetLike < ApplicationRecord
  belongs_to :tweet
  belongs_to :like, inverse_of: :tweet_likes
end
