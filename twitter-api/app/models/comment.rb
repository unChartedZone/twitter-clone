class Comment < ApplicationRecord
  belongs_to :tweet, counter_cache: true
  belongs_to :user
  has_many :comment_media, dependent: :destroy

  accepts_nested_attributes_for :comment_media, allow_destroy: true
  validates :content, presence: true
end
