# frozen_string_literal: true
module DateHelper
  extend ActionView::Helpers::DateHelper

  def self.time_since(date)
    time_ago_in_words(date)
  end
end
