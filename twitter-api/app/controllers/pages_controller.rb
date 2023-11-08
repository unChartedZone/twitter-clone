class PagesController < ApplicationController
  def index
    render json: {message: "Welcome to Twitter API"}
  end

  def potato
    render text: 'My potatoes!'
  end
end