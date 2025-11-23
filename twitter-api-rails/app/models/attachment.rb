class Attachment < ApplicationRecord
  belongs_to :tweet
  has_one_attached :file

  validates :file, presence: true
  validates :alt_text, length: { maximum: 1000 }, allow_blank: true
  validate :acceptable_file_type

  def media_url
    puts "File Attached? #{file.attached?}"
    return unless file.attached?

    Rails.application.routes.url_helpers.url_for(file.variant(resize_to_limit: [500, 500], format: :jpg))
  end

  private

  def acceptable_file_type
    return unless file.attached?

    acceptable_types = [ "image/jpeg", "image/png", "image/webp" ]
    unless acceptable_types.include?(file.content_type)
      errors.add(:file, "must be a JPEG, PNG, GIF, WEBP or MP4")
    end
  end
end
