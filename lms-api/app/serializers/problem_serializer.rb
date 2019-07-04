class ProblemSerializer < ActiveModel::Serializer
  # belongs_to :assignment
  has_many :answers
  attributes :id, :question, :answers
end
