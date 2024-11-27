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
    get '/profile/:username/protected', on: :collection, to: 'tweets#protected_profile_tweets',
                                        as: 'protected_profile'
    get 'feed', on: :collection, to: 'tweets#feed'
    get 'explore', on: :collection, to: 'tweets#explore_user_tweets'
    post 'like', on: :member
    post 'unlike', on: :member
    post 'retweet', on: :member
    post 'unretweet', on: :member, to: 'tweets#undo_retweet'
    get '/:username', on: :collection, to: 'tweets#protected_profile_tweets', as: 'profile'
    get '/:username/media', on: :collection, to: 'tweets#media_tweets', as: 'media'
    get '/:username/liked', on: :collection, to: 'tweets#liked_tweets', as: 'liked'
  end

  resources :medium, only: %i[index create], path: :media
end
