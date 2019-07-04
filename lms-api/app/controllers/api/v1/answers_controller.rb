class Api::V1::AnswersController < ApplicationController
    def index
        @answers = Answer.all
        render json: @answers
    end

    def show 
        @answer = Answer.find(params[:id])

        render json: @answer
    end

    def update 
        # byebug
        @answer = Answer.find(params[:id])
        @answer.update(points_assigned: params[:points_assigned].to_i)
        render json: @answer
    end

    # def create 
        
    # end
end
