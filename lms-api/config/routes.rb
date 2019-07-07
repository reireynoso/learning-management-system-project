Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post "/login", to: "auth#login"
      get "/auto_login", to: "auth#auto_login"
      get "students/:id/student_grades", to: "students#student_grades"
      get "teachers/:id/teacher_grades", to: "teachers#teacher_grades"
      resources :teachers, only: [:index, :create, :show] do
        resources :courses, only: [:index, :create, :destroy] do
          resources :announcements, only: [:index]
        end
      end
      resources :students, only: [:index, :create, :show] do 
        resources :enrollments, only: [:index, :create, :show, :destroy]
      end
      resources :subjects, only: [:index,:show]
      resources :courses, only: [:index,:show] do 
        resources :announcements, only: [:create, :destroy,:update] do 
          resources :comments, only: [:index, :show, :create, :destroy]
        end
        resources  :assignments, only: [:index, :create, :show, :destroy] do 
          resources :problems, only: [:index, :show, :create, :destroy] 
          # resources :submissions, only: [:index, :show, :update] 
        end
      end
      resources :submissions, only: [:index, :create, :show, :update]
      resources :answers, only: [:index,:show,:update]
      # resources :comments, only: [:index]
    end
  end
end
