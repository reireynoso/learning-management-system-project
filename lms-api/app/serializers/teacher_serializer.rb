class TeacherSerializer < ActiveModel::Serializer
  has_many :courses
  # has_many :subjects, through: :courses
  attributes :id, :username, :first_name,:last_name,:bio,:image_url,:position,:courses

  # def courses 
  #   id: self.object.courses.id
  #   # name: self.object.courses.name
  # end
end
