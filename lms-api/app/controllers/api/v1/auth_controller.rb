class Api::V1::AuthController < ApplicationController
    # skip_before_action :require_login, only: [:login,:auto_login]
    def login
        # byebug
        if params[:position] == "teacher"
            user = Teacher.find_by(username: params[:username])
            if user && user.authenticate(params[:password])
                payload = {user_id: user.id, position: user.position}
                # byebug
                token = encode_token(payload)
                # session_user(token)
                render json: {user: TeacherSerializer.new(user), jwt: token, success: "Welcome back, #{user.username}"}
            else
                render json: {failure: "Log in failed! Username or password invalid!"}
            end
        elsif params[:position] == "student"
            user = Student.find_by(username: params[:username])
            if user && user.authenticate(params[:password])
                payload = {user_id: user.id, position: user.position}
                # byebug
                token = encode_token(payload)
                # session_user(token)
                render json: {user: StudentSerializer.new(user), jwt: token, success: "Welcome back, #{user.username}"}
            else
                render json: {failure: "Log in failed! Username or password invalid!"}
            end
        end

        # if user && user.authenticate(params[:password])
        #     payload = {user_id: user.id, position: user.position}
        #     # byebug
        #     token = encode_token(payload)
        #     # session_user(token)
		# 	render json: {user: user, jwt: token, success: "Welcome back, #{user.username}"}
		# else
		# 	render json: {failure: "Log in failed! Username or password invalid!"}
		# end
    end 

    def auto_login
        # byebug
        if session_user
            render json: session_user
        else
            render json: {errors: "Don't touch my cookies!"}
        end
    end
end
