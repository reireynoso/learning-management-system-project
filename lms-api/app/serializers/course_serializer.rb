class CourseSerializer < ActiveModel::Serializer
  belongs_to :subject
  belongs_to :teacher
  has_many :announcements
  has_many :assignments
  attributes :id, :name, :subject, :announcements, :teacher, :assignments

  def subject 
    {
      name: self.object.subject.name
    }
  end

  def teacher
    {
      first_name: self.object.teacher.first_name,
      last_name: self.object.teacher.last_name
    }
  end
end
