# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Subject.destroy_all
Teacher.destroy_all
Course.destroy_all
Student.destroy_all

puts 'seeding'


math = Subject.create(name: "Math")
science = Subject.create(name: "Science")
literature = Subject.create(name: "Literature")
history = Subject.create(name: "History")
technology = Subject.create(name: "Technology")

puts 'loaded subjects'

rei = Teacher.create(username: "rreynoso", password: "hello", first_name: "Rei", last_name:"Rey", bio: "Cool", image_url: "", position: "teacher")

puts 'courses loaded'

algebra = Course.create(name: "Algebra", teacher_id: rei.id, subject_id: math.id);
algebra2 = Course.create(name: "Algebra 2", teacher_id: rei.id, subject_id: math.id);

algebraAnnouncement1 = Announcement.create(title: "Hello", information: "TESTING THIS SHIT", video_url: "", course_id: algebra.id)
algebraAnnouncement2 = Announcement.create(title: "Hello2", information: "TESTING", video_url: "", course_id: algebra.id)

reiStudent = Student.create(username: "rei", password: "hello", first_name: "Reinald", last_name:"Reynoso", bio: "Cool", image_url: "", position: "student" )
reiStudent2 = Student.create(username: "rei2", password: "hello", first_name: "Reinald", last_name:"Reynoso", bio: "Cool", image_url: "", position: "student" )

enrollment1 = Enrollment.create(course_id: algebra.id, student_id: reiStudent.id)
enrollment2 = Enrollment.create(course_id: algebra.id, student_id: reiStudent2.id)

puts 'done'