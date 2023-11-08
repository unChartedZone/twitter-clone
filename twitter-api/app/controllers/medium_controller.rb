class MediumController < ApplicationController
  before_action :is_authenticated, only: [:create]

  def index
    medium = Medium.all
    render json: MediumSerializer.new(medium)
  end

  def create
    if new_media_params[:image].present?
      @media = Medium.new
      @media.image.attach(new_media_params[:image])
      @media.description = new_media_params[:description]
      @media.user = current_user

      if @media.save
        @media.url = url_for(@media.image)
        render json: { media: @media }
      else
        render json: { errors: @media.errors }, status: :bad_request
      end
    end
  end

  private

  def new_media_params
    params.permit(:image, :description)
  end
end
