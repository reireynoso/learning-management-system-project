class Student < ApplicationRecord
    has_secure_password
    validates_uniqueness_of :username
    has_many :enrollments
    has_many :courses, through: :enrollments
    has_many :submissions
    has_many :answers
    has_many :comments, as: :commentable
end
