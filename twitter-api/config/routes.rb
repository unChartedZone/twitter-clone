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

  # Settings Endpoints
  patch 'password', to: 'settings#change_password'

  # User endpoints
  get 'me', to: 'users#me'
  resources :users, only: %i[index show update] do
    get 'following', on: :collection, to: 'users#following'
    get 'followers', on: :collection, to: 'users#followers'
    get 'explore', on: :collection, to: 'users#explore_users'
    get ':username', on: :collection, to: 'users#show_by_username'
    post 'follow/:id', on: :collection, to: 'users#follow_user'
    post 'unfollow/:id', on: :collection, to: 'users#unfollow_user'
    patch 'update-image', on: :collection, to: 'users#update_image'
  end

  # Tweet Endpoints
  resources :tweets, only: %i[index show create] do
    get 'feed', on: :collection, to: 'tweets#feed'
    get 'explore', on: :collection, to: 'tweets#explore_user_tweets'
    post 'like', on: :member
    post 'unlike', on: :member
    post 'retweet', on: :member
    post 'unretweet', on: :member, to: 'tweets#undo_retweet'
    get '/profile/:username', on: :collection, to: 'tweets#protected_profile_tweets', as: 'profile'
    get '/profile/:username/replied', on: :collection, to: 'tweets#replied_tweets', as: 'replied'
    get '/profile/:username/media', on: :collection, to: 'tweets#media_tweets', as: 'media'
    get '/profile/:username/liked', on: :collection, to: 'tweets#liked_tweets', as: 'liked'
  end

  # Bookmark Endpoints
  resources :bookmarks, only: %i[index create destroy], param: :tweet_id

  # Comment Endpoints
  resources :comments, only: [:index, :create, :destroy]

  resources :notifications, only: [:index]

  resources :medium, only: %i[index create], path: :media

  # Chat Threads Endpoints
  resources :chat_threads, only: [:index, :create], path: :threads
  # Chat Messages Endpoints
  resources :messages, only: [:index, :create, :destroy], path: :messages

  # Password Endpoints
  post '/password/reset', to: 'password#create'
  get '/password/reset/valid', to: 'password#valid_token'
  post '/password/update', to: 'password#update'
end
