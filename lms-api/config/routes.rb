Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post "/login", to: "auth#login"
      get "/auto_login", to: "auth#auto_login"
      resources :teachers, only: [:index, :create, :show] do
        resources :courses, only: [:index, :create, :destroy] do
          resources :announcements, only: [:index]
        end
      end
      resources :students, only: [:index, :create, :show]
      resources :subjects, only: [:index,:show]
      resources :courses, only: [:index,:show] do 
        resources :announcements, only: [:create, :destroy,:update]
      end
    end
  end
end
