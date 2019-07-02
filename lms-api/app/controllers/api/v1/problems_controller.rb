class Api::V1::ProblemsController < ApplicationController
    def index 
        @problems = Problem.all
        render json: @problems
    end

    def create 
        # byebug
        @problem = Problem.create(problem_params)
        render json: @problem
    end

    def show 
        @problem = Problems.find(params[:id])
        render json: @problem
    end

    private

    def problem_params
        params.require(:problem).permit(:question, :assignment_id)
    end
end
