class NotificationBlueprint < ApplicationBlueprint
  identifier :id
  fields :text

  association :initiator, blueprint: UserBlueprint, default: {}
end
