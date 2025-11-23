class CommentAttachment < ApplicationRecord
  belongs_to :comment
  has_one_attached :attachment

  def attachment_url
    if attachment.attached?
      Rails.application.routes.url_helpers.url_for(attachment.representation(resize_to_limit: [500, 500]).processed.url)
    end
  end
end
