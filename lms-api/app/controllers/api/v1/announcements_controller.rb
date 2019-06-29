class Api::V1::AnnouncementsController < ApplicationController
    def index
        @announcements = Announcement.all
    end

end
