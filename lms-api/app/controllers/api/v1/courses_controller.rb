class Api::V1::CoursesController < ApplicationController

    def index 
        @courses = Course.all
        render json: @courses
    end

    def create 
        @course = Course.create(courses_params)
        # byebug
        if @course.valid?
            # byebug
            # @teacher = Teacher.find_by(id: @course.teacher_id)
            render json: @course
            # render json: {teacher: TeacherSerializer.new(@teacher)}
        else
            render json: { error: 'failed to create course' }, status: :not_acceptable
        end
    end

    def show 
        # byebug
        @course = Course.find(params[:id])
        render json: @course
    end

    def destroy
        # byebug 
        Course.delete(params[:id])
        render json: {success: "Course Deleted"}
    end

    private

    def courses_params
        params.require(:course).permit(:name, :teacher_id, :subject_id)
    end
end
