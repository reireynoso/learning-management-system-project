class Api::V1::AnnouncementsController < ApplicationController
    def index
        @announcements = Announcement.all
    end

    def create 
        # byebug
        @announcement = Announcement.create(announcement_params)
        # byebug
        if @announcement.valid? 
            render json: @announcement
        else

            render json: {error: 'failed to create announcement'}
        end
    end

    def update 
        @announcement = Announcement.find(params[:announcement][:id])
        # byebug
            @announcement.update(announcement_params)
            if @announcement.save
                render json: @announcement, status: :accepted
            else
                render json: { errors: @announcement.errors.full_messages }, status: :unprocessible_entity
        end
    end

    def destroy
        # byebug
        Announcement.destroy(params[:id])
        render json: {success: "Announcement deleted"}
    end

    private

    def announcement_params
        params.require(:announcement).permit(:title, :information,:video_url,:course_id)
    end
end
