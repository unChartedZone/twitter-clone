class AttachmentBlueprint < ApplicationBlueprint
  identifier :id

  fields :alt_text

  field(:url) { |a| a.media_url }

end
