class ChatThreadBlueprint < ApplicationBlueprint
  identifier :id

  association :users, blueprint: UserBlueprint, default: []
end
