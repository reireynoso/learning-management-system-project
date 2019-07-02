class Course < ApplicationRecord
    belongs_to :subject
    belongs_to :teacher
    has_many :announcements
    has_many :enrollments
    has_many :assignments
end
