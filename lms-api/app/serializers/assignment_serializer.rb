class AssignmentSerializer < ActiveModel::Serializer
  has_many :problems
  attributes :id, :name, :note, :course_id, :due_date, :problems
end
