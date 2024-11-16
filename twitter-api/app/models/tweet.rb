class Tweet < ApplicationRecord
  belongs_to :user, counter_cache: true
  before_validation :set_total_likes!
  before_validation :set_total_retweets!

  has_many :tweet_media, dependent: :destroy
  has_many :medium, through: :tweet_media, dependent: :destroy
  has_many :tweet_likes, dependent: :destroy
  has_many :likes, through: :tweet_likes
  has_many :retweets, dependent: :destroy

  def set_total_likes!
    self.total_likes = tweet_likes.length
  end

  def set_total_retweets!
    self.total_retweets = retweets.length
  end

  def build_tweet_like(user_id)
    like = Like.new(user_id: user_id)
    like.save
    tweet_like = tweet_likes.build(like_id: like.id)
    yield tweet_like if block_given?
  end

  def build_retweet(user_id)
    retweet = Retweet.new(tweet_id: self.id, user_id: user_id)
    retweet.save
    yield retweet if block_given?
  end
end
