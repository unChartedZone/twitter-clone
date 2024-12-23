# frozen_string_literal: true

class NotificationService
  def self.create_notification(initiator:, recipient:, action_text:)
    Rails.logger.info("Initiator: #{initiator}")
    Notification.create!(
      initiator: initiator,
      recipient: recipient,
      text: action_text
    )
  end
end
