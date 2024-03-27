class TweetMedium < ApplicationRecord
  belongs_to :tweet
  belongs_to :medium, inverse_of: :tweet_media
end
