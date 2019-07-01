class Api::V1::EnrollmentsController < ApplicationController
    def index 
        @enrollments = Enrollment.all
        render json: @enrollments
    end

    def create 
        @enrollment = Enrollment.create(enrollment_params)
        # byebug
        render json: @enrollment
    end

    def destroy
        Enrollment.destroy(params[:id])
        render json: {success: "Enrollment deleted"}
    end

    private

    def enrollment_params
        params.require(:enrollment).permit(:course_id, :student_id)
    end
end
