class PagesController < ApplicationController
  def index
    render json: { message: "Welcome to Twitter API" }
  end

  def potato
    render json: { message: "My potatoes!" }
  end
end
