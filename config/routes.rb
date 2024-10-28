Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :coach, only: [:index, :show, :create]
  resources :slot, only: [:index, :create, :update]
  resources :student, only: [:index, :show]
  resources :call, only: [:index, :update, :create]

  root 'home#index'
  get '*path', to: 'home#index', constraints: -> (request) do
    !request.xhr? && request.format.html?
  end
end
