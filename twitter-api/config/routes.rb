Rails.application.routes.draw do
  # resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get 'about', to: 'pages#index'
  get 'potato', to: 'pages#potato'

  # Auth Endpoints
  post 'signup', to: 'auth#signup'
  post 'login', to: 'auth#login'
  post 'refresh', to: 'auth#refresh_current_token'
  post 'logout', to: 'auth#logout'

  # User endpoints
  get 'me', to: 'users#me'
  post 'me/profile-image', to: 'users#update_profile_image'
  post 'me/banner-image', to: 'users#update_banner_image'
  resources :users, only: %i[index show update]

  # Tweet Endpoints
  resources :tweets, only: [:index, :create]
  resources :medium, only: [:index, :create], path: :media
end
