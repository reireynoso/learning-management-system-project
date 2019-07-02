class ProblemSerializer < ActiveModel::Serializer
  belongs_to :assignment
  attributes :id, :question
end
