class PagesController < ApplicationController
  def index
    render json: 'Hello World'
  end

  def potato
    render text: 'My potatoes!'
  end
end