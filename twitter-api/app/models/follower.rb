class Follower < ApplicationRecord
  # User who is doing the following
  belongs_to :user, counter_cache: :followings_count
  # User that is being followed
  belongs_to :followed_user, foreign_key: :followed_user, class_name: 'User', counter_cache: :followers_count
end
