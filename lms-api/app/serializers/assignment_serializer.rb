class AssignmentSerializer < ActiveModel::Serializer
  has_many :problems
  has_many :submissions
  attributes :id, :name, :note, :course_id, :due_date, :problems, :submissions
end
