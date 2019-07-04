class Student < ApplicationRecord
    has_secure_password
    has_many :enrollments
    has_many :courses, through: :enrollments
    has_many :submissions
    has_many :answers
end
