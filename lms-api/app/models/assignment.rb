class Assignment < ApplicationRecord
    belongs_to :course
    has_many :problems
end
