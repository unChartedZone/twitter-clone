class ApplicationController < ActionController::API
  include ::ActionController::Cookies
  include Authenticable
  before_action :transform_params

  private

  def transform_params
    request.parameters.deep_transform_keys!(&:underscore)
  end
end
