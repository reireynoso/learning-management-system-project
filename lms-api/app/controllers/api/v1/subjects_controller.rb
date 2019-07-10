class Api::V1::SubjectsController < ApplicationController
    skip_before_action :require_login, only: [:index]
    def index 
        @subjects = Subject.all
        render json: @subjects
    end
end
