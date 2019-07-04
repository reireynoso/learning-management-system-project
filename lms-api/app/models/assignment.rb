class Assignment < ApplicationRecord
    belongs_to :course
    has_many :problems, :dependent => :delete_all
    has_many :submissions, :dependent => :delete_all
end
