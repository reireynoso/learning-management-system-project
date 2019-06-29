class Api::V1::TeachersController < ApplicationController
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
            render json: { error: 'failed to create teacher' }, status: :not_acceptable
        end
    end

    def show
        @teacher = Teacher.find(params[:id])
        # byebug
        render json: @teacher
    end

    def teacher_params
        params.require(:user).permit(:username, :password, :first_name, :last_name, :bio, :image_url,:position)
    end

    
end
