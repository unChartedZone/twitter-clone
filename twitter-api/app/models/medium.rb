class Medium < ApplicationRecord
  belongs_to :user
  has_many :tweet_media
  has_many :tweets, through: :tweet_media
  has_one_attached :image
end
