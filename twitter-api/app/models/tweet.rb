class Tweet < ApplicationRecord
  belongs_to :user, counter_cache: true

  has_many :tweet_media, dependent: :destroy
  has_many :medium, through: :tweet_media, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :retweets, dependent: :destroy
  has_many :bookmarks, dependent: :destroy
  has_many :bookmarked_by_users, through: :bookmarks, source: :user
  has_many :comments, dependent: :destroy

  def bookmarked?(user)
    bookmarks.exists?(user_id: user.id)
  end

  def build_tweet_like(user_id)
    like = Like.new(tweet_id: id, user_id:)
    like.save
    yield like if block_given?
  end

  def build_retweet(user_id)
    retweet = Retweet.new(tweet_id: id, user_id:)
    retweet.save
    yield retweet if block_given?
  end
end
