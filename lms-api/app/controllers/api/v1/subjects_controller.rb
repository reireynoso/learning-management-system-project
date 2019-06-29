class Api::V1::SubjectsController < ApplicationController
    def index 
        @subjects = Subject.all
        render json: @subjects
    end
end
