class SubmissionSerializer < ActiveModel::Serializer
  belongs_to :assignment
  belongs_to :student
  has_many :answers
  attributes :id, :answers, :assignment, :student, :grade_assigned, :created_at, :updated_at

  def assignment 
    {
      name: self.object.assignment.name,
      id: self.object.assignment.id,
      due_date: self.object.assignment.due_date
    }
  end

  def student 
    {
      first_name: self.object.student.first_name,
      last_name: self.object.student.last_name
    }
  end
end
