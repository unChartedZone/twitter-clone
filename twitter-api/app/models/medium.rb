class Medium < ApplicationRecord
  belongs_to :tweet
  has_one_attached :image

  def media_url
    return unless image.attached?
    Rails.application.routes.url_helpers.url_for(image.variant(resize_to_limit: [500, 500], format: :jpg))
  end
end
