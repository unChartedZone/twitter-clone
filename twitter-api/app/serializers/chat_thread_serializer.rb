# frozen_string_literal: true

class ChatThreadSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower

  has_many :users, serializer: UserSummarySerializer

  attributes :id

  attribute :users do |thread, params|
    thread.users.reject { |user| user.id == params[:current_user_id] }.map do |user|
      UserSummarySerializer.new(user).serializable_hash[:data][:attributes]
    end
  end
end
