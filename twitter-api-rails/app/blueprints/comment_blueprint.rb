class CommentBlueprint < ApplicationBlueprint
  identifier :id

  fields :content

  association :user, blueprint: UserBlueprint, default: {}
end
