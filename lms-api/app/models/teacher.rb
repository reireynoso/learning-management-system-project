class Teacher < ApplicationRecord
    has_secure_password
    validates_uniqueness_of :username
    has_many :courses, :dependent => :delete_all
    has_many :comments, as: :commentable
end
