class ChatMessageBlueprint < ApplicationBlueprint
  identifier :id
  fields :body
  association :user, blueprint: UserBlueprint, default: {}
end
