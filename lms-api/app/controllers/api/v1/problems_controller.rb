class Api::V1::ProblemsController < ApplicationController
    def index 
        @problems = Problems.all
    end

    def show 
        @problem = Problems.find(params[:id])
    end
end
