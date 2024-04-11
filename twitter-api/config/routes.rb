Rails.application.routes.draw do
  # resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'pages#index'
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
  resources :tweets, only: [:index, :show, :create] do
    get '/profile/:username/protected', on: :collection, to: 'tweets#protected_profile_tweets'
    get '/profile/:username', on: :collection, to: 'tweets#profile_tweets'
    get 'liked', on: :collection, to: 'tweets#liked_tweets'
    post 'like', on: :member
    post 'unlike', on: :member
    post 'retweet', on: :member
    post 'unretweet', on: :member, to: 'tweets#undo_retweet'
  end

  resources :medium, only: [:index, :create], path: :media
end
