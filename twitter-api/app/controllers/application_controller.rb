class ApplicationController < ActionController::API
  include ::ActionController::Cookies
  include Authenticable
  before_action :transform_params

  private

  # Let's json body to be in camel case and be converted into snake case
  def transform_params
    request.parameters.deep_transform_keys!(&:underscore)
  end
end
