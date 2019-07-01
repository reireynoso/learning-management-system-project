class StudentSerializer < ActiveModel::Serializer
  has_many :enrollments
  has_many :courses, through: :enrollments
  attributes :id, :username, :first_name,:last_name,:bio,:image_url,:position, :courses

end
