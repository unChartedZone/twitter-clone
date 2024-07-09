class Follower < ApplicationRecord
  # User who is doing the following
  belongs_to :user
  # User that is being followed
  belongs_to :followed_user, foreign_key: :followed_user, class_name: 'User'
end
