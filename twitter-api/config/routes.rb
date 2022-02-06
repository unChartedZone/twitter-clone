Rails.application.routes.draw do
  # resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get 'about', to: 'pages#index'
  get 'potato', to: 'pages#potato'
  post 'signup', to: 'auth#signup'
  post 'login', to: 'auth#login'
  get 'user', to: 'auth#user'
end
