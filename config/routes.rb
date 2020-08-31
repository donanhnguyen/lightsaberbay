# Rails.application.routes.draw do
#   # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
#   namespace :api, defaults: {format: :json} do
#     resources :users, only: [:create, :show, :index] do 
#       resources :lightsabers, only: [:create, :index, :show, :destroy, :update,] do
#         resources :marketplaces, only: [:create, :index, :show]
#       end
#     end
#     resource :session, only: [:create, :destroy, :show, :index]
#   end

#   root "root_page#root"

# end

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :index] do 
      resources :lightsabers, only: [:create, :index, :show, :destroy, :update,] 
    end
    resources :users, only: [:create, :show, :index] do
      resources :messages, only: [:create, :index, :show] 
    end
    resource :session, only: [:create, :destroy, :show, :index]
    resources :lightsabers, only: [:create, :index, :show, :destroy, :update,] 
  end

  root "root_page#root"

end
