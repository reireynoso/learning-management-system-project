class CourseSerializer < ActiveModel::Serializer
  belongs_to :subject
  has_many :announcements
  attributes :id, :name, :subject, :announcements

  def subject 
    {
      name: self.object.subject.name
    }
  end
end
