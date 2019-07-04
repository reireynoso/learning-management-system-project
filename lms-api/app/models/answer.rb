class Answer < ApplicationRecord
    belongs_to :student
    belongs_to :submission
    belongs_to :problem
end
