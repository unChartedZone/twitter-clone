Rails.application.routes.draw do
  get "auth/signup"
  get "auth/login"
  get "auth/refresh_session"
  get "auth/logout"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  root "pages#index"
  get "/potato", to: "pages#potato"

  # Users
  resources :users
end
