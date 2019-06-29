class ApplicationController < ActionController::API
    def encode_token(payload)
        JWT.encode(payload, 'my_s3cr3t')
    end

    def auth_header
        request.headers['Authorization']
    end

    def decoded_token(token)
        # byebug
        if auth_header
            # token = auth_header.split(' ')[1]
            begin
                JWT.decode(auth_header, 'my_s3cr3t', true, algorithm: 'HS256')
            rescue JWT::DecodeError
                nil
            end
        end
    end

    def session_user
        # byebug
        decoded_hash = decoded_token(auth_header)
        if !decoded_hash.empty? 
            user_id = decoded_hash[0]['user_id']
            if decoded_hash[0]['position'] === "teacher"
                @user = Teacher.find_by(id: user_id)
            elsif decoded_hash[0]['position'] === "student"
                @user = Student.find_by(id: user_id)
            else
                nil
            end
            # byebug
        end
    end

    def logged_in?
        !!session_user
    end
end
