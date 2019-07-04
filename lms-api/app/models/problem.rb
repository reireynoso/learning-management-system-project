class Problem < ApplicationRecord
    belongs_to :assignment
    has_many :answers
end
