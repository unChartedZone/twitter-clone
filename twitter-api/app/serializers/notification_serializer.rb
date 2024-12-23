# frozen_string_literal: true

class NotificationSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower

  attributes :id, :text, :created_at

  attribute :initiator do |notification|
    UserSummarySerializer.new(notification.initiator).serializable_hash[:data][:attributes]
  end
end
