class AnswerSerializer < ActiveModel::Serializer
  belongs_to :student
  belongs_to :problem
  belongs_to :submission
  attributes :id, :question, :points_assigned, :answer
end
