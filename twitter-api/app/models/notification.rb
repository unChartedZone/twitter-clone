class Notification < ApplicationRecord
  belongs_to :initiator, class_name: 'User'
  belongs_to :recipient, class_name: 'User'

  validates :text, presence: true
end
