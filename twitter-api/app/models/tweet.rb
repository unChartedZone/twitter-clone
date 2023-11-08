class Tweet < ApplicationRecord
  belongs_to :user
  has_many :tweet_media, dependent: :destroy
  has_many :medium, through: :tweet_media, dependent: :destroy
end
