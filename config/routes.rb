Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'
  namespace :api, defaults: { format: :json } do 
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :accounts, only: [:show]
    get 'accounts_by_name/:account_name', to: 'accounts#show_by_name', as: 'account_name'
  end
end
