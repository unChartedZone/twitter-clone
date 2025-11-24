class Tweet < ApplicationRecord
  belongs_to :user, counter_cache: true

  has_many :attachments, -> { order(created_at: :asc) }, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :retweets, dependent: :destroy
  has_many :bookmarks, dependent: :destroy
  has_many :bookmarked_by_users, through: :bookmarks, source: :user
  has_many :comments, dependent: :destroy

  validates :text, length: { maximum: 280 }, allow_blank: true
  # validate :text_or_media_present

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

  private

  def text_or_media_present
    puts "Attachment Size: #{attachments.size}"

    if text.blank? && attachments.blank?
      errors.add(:base, "A tweet must have either text or media.")
    end
  end
end
