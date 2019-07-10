class Api::V1::TeachersController < ApplicationController
    skip_before_action :require_login, only: [:create]
    def index 
        @teachers = Teacher.all 
        render json: @teachers
    end

    def create 
        # byebug
        @teacher = Teacher.create(teacher_params)
        # byebug
        if @teacher.valid?
            payload = {user_id: @teacher.id, position: @teacher.position}
            # byebug
            token = encode_token(payload)
            render json: {teacher: TeacherSerializer.new(@teacher), jwt: token}
        else
            render json: {errors: @teacher.errors.full_messages}, status: :not_acceptable
        end
    end

    def show
        @teacher = Teacher.find(params[:id])
        # byebug
        render json: @teacher
    end

    def teacher_grades
        # byebug
        @teacher = Teacher.find(params[:id])
        @teacher_courses = Course.all.where(teacher_id: @teacher.id)
        @teacher_course_with_grades = []
        @teacher_courses.each do |course|
            teacher_course = {name: course.name, grades: []}  
            course.submissions.filter do |submission|
                if submission.created_at != submission.updated_at
                    teacher_course[:grades] << submission.grade_assigned
                end
            end
            @teacher_course_with_grades << teacher_course
        end
        # byebug
        @teacher_course_with_grades.collect do |course|
            course_total = 0
            course[:grades].collect do |grade|
                course_total += grade
            end
            if course[:grades].length == 0
                course[:grades] = 0
            else
                course[:grades] = course_total / course[:grades].length
            end
            
        end
        # byebug
        render json: @teacher_course_with_grades
    end

    private

    def teacher_params
        params.require(:user).permit(:username, :password, :first_name, :last_name, :bio, :image_url,:position)
    end

    
end
