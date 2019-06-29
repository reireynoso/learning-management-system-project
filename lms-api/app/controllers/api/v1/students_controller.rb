class Api::V1::StudentsController < ApplicationController
    def index 
        @students = Student.all 
        render json: @students
    end

    def create 
        # byebug
        @student = Student.create(student_params)
        # byebug
       
        if @student.valid?
            payload = {user_id: @student.id, position: @student.position}
            # byebug
            token = encode_token(payload)
            render json: {student: StudentSerializer.new(@student), jwt: token}
        else
            render json: { error: 'failed to create user' }, status: :not_acceptable
        end
    end

    def show
        @student = Student.find(params[:id])
        render json: @student
    end

    def student_params
        params.require(:user).permit(:username, :password, :first_name, :last_name, :bio, :image_url,:position)
    end
    
end
