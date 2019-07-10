class Api::V1::StudentsController < ApplicationController
    skip_before_action :require_login, only: [:create]
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
            render json: {errors: @student.errors.full_messages}, status: :not_acceptable
            # render json: { error: 'failed to create user' }, status: :not_acceptable
        end
    end

    def show
        @student = Student.find(params[:id])
        render json: @student
    end

    def student_grades 
        # @grades_by_subject = {student: {}, grades: []}
        # @student = Student.find(params[:id])
        # @grades_by_subject[:student] = @student
        # @student.submissions.map do |submission|  
        #     if submission.created_at != submission.updated_at
        #             @grades_by_subject[:grades] << {grade_assigned: submission.grade_assigned, subject: submission.assignment.course.subject.name}
        #     end
        # end
        # byebug
        math = []
        science = []
        literature = []
        technology = []
        history = []
        @student = Student.find(params[:id])
        @student.submissions.map do |submission|  
            if submission.created_at != submission.updated_at
                if submission.assignment.course.subject.name == "Math"
                    if submission.grade_assigned == nil
                        math << 0
                    else
                        math << submission.grade_assigned
                    end
                elsif submission.assignment.course.subject.name == "Literature"
                    if submission.grade_assigned == nil
                        literature << 0
                    else
                        literature << submission.grade_assigned
                    end
                elsif submission.assignment.course.subject.name == "Science"
                    if submission.grade_assigned == nil
                        science << 0
                    else
                        science << submission.grade_assigned
                    end
                elsif submission.assignment.course.subject.name == "History"
                    if submission.grade_assigned == nil
                        history << 0
                    else
                        history << submission.grade_assigned
                    end
                elsif submission.assignment.course.subject.name == "Technology"
                    if submission.grade_assigned == nil
                        technology << 0
                    else
                        technology << submission.grade_assigned
                    end
                end
            end
        end

        mathTotal = 0
        math.each do |score| 
            mathTotal += score
        end

        if math.length == 0 
            mathAverage = 0
        else 
            mathAverage = mathTotal / math.length
        end

        literatureTotal = 0
        literature.each do |score| 
            literatureTotal += score
        end
        if literature.length == 0 
            literatureAverage = 0
        else 
            literatureAverage = literatureTotal / literature.length
        end

        historyTotal = 0
        history.each do |score| 
            historyTotal += score
        end
        
        if history.length == 0 
            historyAverage = 0
        else 
            historyAverage = historyTotal / history.length
        end

        scienceTotal = 0
        science.each do |score| 
            scienceTotal += score
        end
        
        if science.length == 0 
            scienceAverage = 0
        else 
            scienceAverage = scienceTotal / science.length
        end

        technologyTotal = 0
        technology.each do |score| 
            technologyTotal += score
        end

        if technology.length == 0 
            technologyAverage = 0
        else 
            technologyAverage = technologyTotal / technology.length
        end
        # byebug
        @grades_by_subject = {math: mathAverage, science: scienceAverage, literature: literatureAverage, technology: technologyAverage, history: historyAverage}
        render json: @grades_by_subject  
    end

    private

    def student_params
        params.require(:user).permit(:username, :password, :first_name, :last_name, :bio, :image_url,:position)
    end
    
end
