class Api::V1::AssignmentsController < ApplicationController
    def index 
        @assignments = Assignment.all 
        render json: @assignments
    end

    def show
        @assignment = Assignment.find(params[:id])
        render json: @assignment
    end

    def create
        # byebug
        @assignment = Assignment.create(assignments_params)
        render json: @assignment 
    end

    def destroy 
        Assignment.delete(params[:id])
        render json: {success: "Assignment deleted"}
    end

    private

    def assignments_params 
        params.require(:assignment).permit(:name, :note, :course_id, :due_date)
    end
end
