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

    def student_grades 
        # @grades = []
        @grades_by_subject = {grades: []}
        @student = Student.find(params[:id])
        # byebug
        @student.submissions.map do |submission|  
            # byebug
            if submission.created_at != submission.updated_at
                # if submission.assignment.course.subject.name == "Math"
                    # byebug
                    @grades_by_subject[:grades] << {grade_assigned: submission.grade_assigned, subject: submission.assignment.course.subject.name}
                # end
            end
        end
        # byebug
        render json: @grades_by_subject  
    end

    private

    def student_params
        params.require(:user).permit(:username, :password, :first_name, :last_name, :bio, :image_url,:position)
    end
    
end
