Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'
  namespace :api, defaults: { format: :json } do 
    resources :users, only: [:create, :index, :show]
    resource :session, only: [:create, :destroy]
    resources :accounts, only: [:show]
    resources :workspaces, only: [:create, :index, :show, :update, :destroy]
    resources :workspace_members, only: [:create]
    resources :boards, only: [:create, :index, :show, :update, :destroy]
    resources :board_members, only: [:create]
    resources :columns, only: [:create, :destroy]
    resources :groups, only: [:create, :update, :destroy]
    resources :items, only: [:create, :destroy]
    resources :item_people, only: [:update]
    resources :statuses, only: [:update]
    resources :due_dates, only: [:update]
    get 'accounts_by_name/:account_name', to: 'accounts#show_by_name', as: 'account_name'
    get 'users_by_email/:email', to: 'users#show_by_email', as: 'user_email'
  end
end
