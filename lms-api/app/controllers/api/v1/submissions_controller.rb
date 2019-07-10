class Api::V1::SubmissionsController < ApplicationController
    def index 
        @submission = Submission.all 
        render json: @submission
    end

    def show 
        byebug
        @submission = Submission.find(params[:id])
        render json: @submission
    end

    def create 
        # byebug
        @submission = Submission.create(submission_params)
        counter = 1
        @submission.date_submitted = @submission.created_at
        # byebug
        @submission.assignment.problems.each do |problem|
            
            ans = "answer#{counter}"
            answer = {
                question:problem.question,
                answer: params[:submission][ans],
                student_id: params[:submission][:student_id],
                problem_id: problem.id,
                submission_id: @submission.id,
                points_assigned: 0
            }
            # byebug
            counter += 1
            Answer.create(answer)
            
        end
        # byebug
        render json: @submission
    end

    def update 
        total_points = 0  
        @submission = Submission.find(params[:id])
        # byebug
        @submission.answers.each do |answer|
            total_points += answer.points_assigned 
        end
        # byebug
        total_answers = @submission.answers.count
        grade_percentage = (total_points.to_f / total_answers.to_f) * 10
        # byebug
        @submission.update(grade_assigned: grade_percentage)
        # byebug
        render json: @submission
        # render json: {submission: SubmissionSerializer.new(@submission)}
    end

    private

    def submission_params
        params.require(:submission).permit(:date_submitted, :assignment_id, :student_id, :grade_assigned)
    end
end
