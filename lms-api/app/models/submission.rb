class Submission < ApplicationRecord
    belongs_to :student
    belongs_to :assignment
    has_many :answers
end
