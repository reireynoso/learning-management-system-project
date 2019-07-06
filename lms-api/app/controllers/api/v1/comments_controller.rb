class Api::V1::CommentsController < ApplicationController
    def index 
        @comments = Comment.all
        render json: @comments
    end

    def create 
        # byebug
        # @commentable = nil
        # byebug
        if params[:comment][:commentable][:position] === "teacher" 
            # byebug
            @commentable = Teacher.find(params[:comment][:commentable][:id])
        else
            @commentable = Student.find(params[:comment][:commentable][:id])
        end
        # byebug
        @comment = Comment.create(content: params[:comment][:content], announcement_id: params[:announcement_id], commentable: @commentable)
        render json: @comment
        
    end

    def destroy
        Comment.destroy(params[:id])
        render json: {success: "Comment Deleted"}
    end
end
