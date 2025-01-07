class Medium < ApplicationRecord
  belongs_to :tweet
  has_one_attached :image
end
