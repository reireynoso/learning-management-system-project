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
Enrollment.destroy_all
Assignment.destroy_all

puts 'seeding'

math = Subject.create(name: "Math")
science = Subject.create(name: "Science")
literature = Subject.create(name: "Literature")
history = Subject.create(name: "History")
technology = Subject.create(name: "Technology")

puts 'loaded subjects'

rei = Teacher.create(username: "rreynoso", password: "hello", first_name: "Rei", last_name:"Rey", bio: "Cool", image_url: "", position: "teacher")
pete = Teacher.create(username: "pete", password: "hello", first_name: "Pete", last_name:"A", bio: "Face", image_url: "", position: "teacher")
luka = Teacher.create(username: "luka", password: "hello", first_name: "Luka", last_name:"B", bio: "Lukal", image_url: "", position: "teacher")
mallory = Teacher.create(username: "mallory", password: "hello", first_name: "Mallory", last_name:"W", bio: "Cats", image_url: "", position: "teacher")

puts 'courses loaded'

algebra = Course.create(name: "Algebra", teacher_id: rei.id, subject_id: math.id);
algebra2 = Course.create(name: "Algebra 2", teacher_id: rei.id, subject_id: math.id);
music = Course.create(name: "Music", teacher_id: pete.id, subject_id: science.id);
cats = Course.create(name: "History of Cats", teacher_id: mallory.id, subject_id: history.id);
buggin = Course.create(name: "Buggin Out", teacher_id: luka.id, subject_id: literature.id);

algebraAnnouncement1 = Announcement.create(title: "Hello", information: "TESTING THIS SHIT", video_url: "https://www.youtube.com/watch?v=dbCYsbb4C58", course_id: algebra.id)
algebraAnnouncement2 = Announcement.create(title: "Hello2", information: "TESTING", video_url: "https://www.youtube.com/watch?v=9DLtzc9KLiw", course_id: algebra.id)

reiStudent = Student.create(username: "rei", password: "hello", first_name: "Reinald", last_name:"Reynoso", bio: "Cool", image_url: "", position: "student" )
reiStudent2 = Student.create(username: "rei2", password: "hello", first_name: "Reinald", last_name:"Reynoso", bio: "Cool", image_url: "", position: "student" )

enrollment1 = Enrollment.create(course_id: algebra.id, student_id: reiStudent.id)
enrollment2 = Enrollment.create(course_id: algebra.id, student_id: reiStudent2.id)

assigned_date = (DateTime.now - 30) + rand(0..60)

assignment1 = Assignment.create(name: "Assignment 1", note: "Please get started on this assignment", course_id: algebra.id, due_date: assigned_date)
assignment2 = Assignment.create(name: "Assignment 2", note: "Please get started on this assignment!!", course_id: algebra.id, due_date: assigned_date)
assignment3 = Assignment.create(name: "Assignment 3", note: "Please get started on this assignment", course_id: algebra2.id, due_date: assigned_date)

problem1 = Problem.create(question: "What it do baby?", assignment_id: assignment1.id)
problem2 = Problem.create(question: "How it do baby???", assignment_id: assignment1.id)
problem3 = Problem.create(question: "Who it do???", assignment_id: assignment1.id)
problem4 = Problem.create(question: "Why it does?", assignment_id: assignment1.id)

puts 'done' 