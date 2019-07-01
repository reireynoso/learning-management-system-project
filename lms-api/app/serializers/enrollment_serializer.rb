class EnrollmentSerializer < ActiveModel::Serializer
  belongs_to :course
  belongs_to :student
  attributes :id, :course, :student
end
