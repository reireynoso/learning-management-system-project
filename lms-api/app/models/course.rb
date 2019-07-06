class Course < ApplicationRecord
    belongs_to :subject
    belongs_to :teacher
    has_many :announcements, :dependent => :delete_all
    has_many :enrollments, :dependent => :delete_all
    has_many :assignments, :dependent => :delete_all
    has_many :submissions, through: :assignments

end
