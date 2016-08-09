Rails.application.routes.draw do

  root 'welcome#index'
  resources :posts
  post 'new', to: 'welcome#create', as: :create
end
