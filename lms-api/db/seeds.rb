# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

Subject.destroy_all
Teacher.destroy_all
Course.destroy_all
Student.destroy_all
Enrollment.destroy_all
Assignment.destroy_all
Submission.destroy_all
Answer.destroy_all
Announcement.destroy_all
Problem.destroy_all
Comment.destroy_all

puts 'seeding'

math = Subject.create(name: "Math")
science = Subject.create(name: "Science")
literature = Subject.create(name: "Literature")
history = Subject.create(name: "History")
technology = Subject.create(name: "Technology")

puts 'loaded subjects'

teachers = [
    {
        username: "rreynoso",
        password: "hello",
        first_name: "Rei",
        last_name: "Rey",
        bio: "I'm a Math Teacher",
        image_url: Faker::LoremFlickr.image,
        position: "teacher"
    },
    {
        username: "pete", 
        password: "hello", 
        first_name: "Pete", 
        last_name:"A", 
        bio: "I'm a Music Teacher", 
        image_url: Faker::LoremFlickr.image, 
        position: "teacher"
    },
    {
        username: "luka", 
        password: "hello", 
        first_name: "Luka", 
        last_name:"B", 
        bio: "I'm a Algorave Teacher", 
        image_url: Faker::LoremFlickr.image, 
        position: "teacher"
    },
    {
        username: "mallory", 
        password: "hello", 
        first_name: "Mallory", 
        last_name:"W", 
        bio: "I'm a History Teacher", 
        image_url: "http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg", 
        position: "teacher"
    }
]

teachers.each do |teacher|
    Teacher.create(teacher)
end

students = [
    {
        username: "rei", 
        password: "hello", 
        first_name: "Reinald", 
        last_name:"Reynoso", 
        bio: "Cool", 
        image_url: Faker::LoremFlickr.image, 
        position: "student" 
    }
]

# rei = Teacher.create(username: "rreynoso", password: "hello", first_name: "Rei", last_name:"Rey", bio: "Cool", image_url: "", position: "teacher")
# pete = Teacher.create(username: "pete", password: "hello", first_name: "Pete", last_name:"A", bio: "Face", image_url: "", position: "teacher")
# luka = Teacher.create(username: "luka", password: "hello", first_name: "Luka", last_name:"B", bio: "Lukal", image_url: "", position: "teacher")
# mallory = Teacher.create(username: "mallory", password: "hello", first_name: "Mallory", last_name:"W", bio: "Cats", image_url: "", position: "teacher")

puts 'courses loaded'

courses = [
    {
        name: "Algebra", 
        teacher_id: Teacher.first.id, 
        subject_id: math.id
    },
    {
        name: "Algebra 2", 
        teacher_id: Teacher.first.id, 
        subject_id: math.id
    },
    {
        name: "Ruby", 
        teacher_id: Teacher.first.id, 
        subject_id: technology.id
    },
    {
        name: "Javascript", 
        teacher_id: Teacher.first.id, 
        subject_id: technology.id
    },
    {
        name: "Science of Music", 
        teacher_id: Teacher.second.id, 
        subject_id: science.id
    },
    {
        name: "Disecting Organisms", 
        teacher_id: Teacher.second.id, 
        subject_id: science.id
    },
    {
        name: "Physics 101", 
        teacher_id: Teacher.second.id, 
        subject_id: science.id
    },
    {
        name: "American History X", 
        teacher_id: Teacher.second.id, 
        subject_id: history.id
    },
    {
        name: "History of Algorave", 
        teacher_id: Teacher.third.id, 
        subject_id: history.id
    },
    {
        name: "Technology of Algorave", 
        teacher_id: Teacher.third.id, 
        subject_id: technology.id
    },
    {
        name: "Science of Algorave", 
        teacher_id: Teacher.third.id, 
        subject_id: science.id
    },
    {
        name: "Poetry of Cats", 
        teacher_id: Teacher.fourth.id, 
        subject_id: literature.id
    },
    {
        name: "History of Cats", 
        teacher_id: Teacher.fourth.id, 
        subject_id: history.id
    },
    {
        name: "Technology of Cats", 
        teacher_id: Teacher.fourth.id, 
        subject_id: technology.id
    }
]

courses.each do |course|
    Course.create(course)
end

# algebra = Course.create(name: "Algebra", teacher_id: rei.id, subject_id: math.id);
# algebra2 = Course.create(name: "Algebra 2", teacher_id: rei.id, subject_id: math.id);
# music = Course.create(name: "Music", teacher_id: pete.id, subject_id: science.id);
# cats = Course.create(name: "History of Cats", teacher_id: mallory.id, subject_id: history.id);
# buggin = Course.create(name: "Buggin Out", teacher_id: luka.id, subject_id: literature.id);

announcements = [
    {
        title: "Algebra 1 Tutorial Video", 
        information: "This is a video covering the foundations of algebra. Please take the time to watch the video.", 
        video_url: "https://www.youtube.com/watch?v=grnP3mduZkM", 
        course_id: Course.first.id
    },
    {
        title: "Solving Equation on Both Sides Video", 
        information: "This is a video covering how to solve equations on both sides. Please take the time to watch the video.", 
        video_url: "https://www.youtube.com/watch?v=f15zA0PhSek", 
        course_id: Course.first.id
    },
    {
        title: "Order of Operations Video", 
        information: "This is a video covering how to solve order of operations. Please take the time to watch the video.", 
        video_url: "https://www.youtube.com/watch?v=ClYdw4d4OmA", 
        course_id: Course.first.id
    },
    {
        title: "Algebra 2 Introduction Video", 
        information: "This is a video covering the basics of Algebra 2. Please take the time to watch the video.", 
        video_url: "https://www.youtube.com/watch?v=i6sbjtJjJ-A", 
        course_id: Course.second.id
    },
    {
        title: "Intro to Ruby Video", 
        information: "This is a video covering the introduction of Ruby Programming. Please take the time to watch the video.", 
        video_url: "https://www.youtube.com/watch?v=FeTIaXh48EM", 
        course_id: Course.third.id
    },
    {
        title: "Introduction to Javascript Video", 
        information: "This is a video covering the introduction of Javascript. Please take the time to watch the video.", 
        video_url: "https://www.youtube.com/watch?v=R-wy_xN5OyA", 
        course_id: Course.fourth.id
    },
    {
        title: "Physics of Music Video", 
        information: Faker::Lorem.paragraph, 
        video_url: "https://www.youtube.com/watch?v=XDsk6tZX55g", 
        course_id: Course.all[4].id
    },
    {
        title: "Flower Disection", 
        information: Faker::Lorem.paragraph, 
        video_url: "https://www.youtube.com/watch?v=493WeySyf-8", 
        course_id: Course.all[5].id
    },
    {
        title: "Physics Crash Course", 
        information: Faker::Lorem.paragraph, 
        video_url: "https://www.youtube.com/watch?v=6wb29I_79lA", 
        course_id: Course.all[6].id
    },
    {
        title: "American History X Review", 
        information: Faker::Lorem.paragraph, 
        video_url: "https://www.youtube.com/watch?v=AtzwHnz0CJw", 
        course_id: Course.all[7].id
    },
    {
        title: "History of Algorave Video", 
        information: Faker::Lorem.paragraph, 
        video_url: "https://www.youtube.com/watch?v=S2EZqikCIfY", 
        course_id: Course.all[8].id
    },
    {
        title: "Technology of Algorave Video", 
        information: Faker::Lorem.paragraph, 
        video_url: "https://www.youtube.com/watch?v=nAGjTYa95HM", 
        course_id: Course.all[9].id
    },
    {
        title: "Science of Algorave Video", 
        information: Faker::Lorem.paragraph, 
        video_url: "https://www.youtube.com/watch?v=h340aNznHnM", 
        course_id: Course.all[10].id
    },
    {
        title: "Cats Poem Video", 
        information: Faker::Lorem.paragraph, 
        video_url: "https://www.youtube.com/watch?v=VuOOV06cmpI", 
        course_id: Course.all[11].id
    },
    {
        title: "Cats History Video", 
        information: Faker::Lorem.paragraph, 
        video_url: "https://www.youtube.com/watch?v=Jsj-hDW9bS8", 
        course_id: Course.all[12].id
    },
    {
        title: "Cats Technology Video", 
        information: Faker::Lorem.paragraph, 
        video_url: "https://www.youtube.com/watch?v=wHbhUUyVn1U", 
        course_id: Course.all[13].id
    },
]

announcements.each do |announcement|
    Announcement.create(announcement)
end
# algebraAnnouncement1 = Announcement.create(title: "Hello", information: "TESTING THIS SHIT", video_url: "https://www.youtube.com/watch?v=dbCYsbb4C58", course_id: algebra.id)
# algebraAnnouncement2 = Announcement.create(title: "Hello2", information: "TESTING", video_url: "https://www.youtube.com/watch?v=9DLtzc9KLiw", course_id: algebra.id)

# reiStudent = Student.create(username: "rei", password: "hello", first_name: "Reinald", last_name:"Reynoso", bio: "Cool", image_url: "", position: "student" )
# reiStudent2 = Student.create(username: "rei2", password: "hello", first_name: "Reinald", last_name:"Reynoso", bio: "Cool", image_url: "", position: "student" )

# enrollment1 = Enrollment.create(course_id: algebra.id, student_id: reiStudent.id)
# enrollment2 = Enrollment.create(course_id: algebra.id, student_id: reiStudent2.id)

assigned_date = (DateTime.now + 1)

assignments = [
    {
        name: "Algebra First Assignment", 
        note: "Please get started on this assignment", 
        course_id: Course.first.id, 
        due_date: assigned_date
    }
]

2.times do 
    Assignment.create(
        name: Faker::Lorem.sentence, 
        note: Faker::Lorem.paragraph, 
        course_id: Course.first.id, 
        due_date: assigned_date
        )
    Assignment.create(
        name: Faker::Lorem.sentence, 
        note: Faker::Lorem.paragraph, 
        course_id: Course.second.id, 
        due_date: assigned_date
        )
    Assignment.create(
        name: Faker::Lorem.sentence, 
        note: Faker::Lorem.paragraph, 
        course_id: Course.third.id, 
        due_date: assigned_date
        )
    Assignment.create(
        name: Faker::Lorem.sentence, 
        note: Faker::Lorem.paragraph, 
        course_id: Course.fourth.id, 
        due_date: assigned_date
        )
    Assignment.create(
        name: Faker::Lorem.sentence, 
        note: Faker::Lorem.paragraph, 
        course_id: Course.fifth.id, 
        due_date: assigned_date
        )
    Assignment.create(
        name: Faker::Lorem.sentence, 
        note: Faker::Lorem.paragraph, 
        course_id: Course.all[5].id, 
        due_date: assigned_date
        )
    Assignment.create(
        name: Faker::Lorem.sentence, 
        note: Faker::Lorem.paragraph, 
        course_id: Course.all[6].id, 
        due_date: assigned_date
        )
    Assignment.create(
        name: Faker::Lorem.sentence, 
        note: Faker::Lorem.paragraph, 
        course_id: Course.all[7].id, 
        due_date: assigned_date
        )
    Assignment.create(
        name: Faker::Lorem.sentence, 
        note: Faker::Lorem.paragraph, 
        course_id: Course.all[8].id, 
        due_date: assigned_date
        )
    Assignment.create(
        name: Faker::Lorem.sentence, 
        note: Faker::Lorem.paragraph, 
        course_id: Course.all[9].id, 
        due_date: assigned_date
        )
    Assignment.create(
        name: Faker::Lorem.sentence, 
        note: Faker::Lorem.paragraph, 
        course_id: Course.all[10].id, 
        due_date: assigned_date
        )
    Assignment.create(
        name: Faker::Lorem.sentence, 
        note: Faker::Lorem.paragraph, 
        course_id: Course.all[11].id, 
        due_date: assigned_date
        )
    Assignment.create(
        name: Faker::Lorem.sentence, 
        note: Faker::Lorem.paragraph, 
        course_id: Course.all[12].id, 
        due_date: assigned_date
        )
    Assignment.create(
        name: Faker::Lorem.sentence, 
        note: Faker::Lorem.paragraph, 
        course_id: Course.all[13].id, 
        due_date: assigned_date
        )
end

4.times do 
    Problem.create(
        question: Faker::Lorem.question, 
        assignment_id: Assignment.first.id
        ) 
    Problem.create(
        question: Faker::Lorem.question, 
        assignment_id: Assignment.second.id
        )
    Problem.create(
        question: Faker::Lorem.question, 
        assignment_id: Assignment.third.id
        )
    Problem.create(
        question: Faker::Lorem.question, 
        assignment_id: Assignment.fourth.id
        )
    Problem.create(
        question: Faker::Lorem.question, 
        assignment_id: Assignment.fifth.id
        )
    Problem.create(
        question: Faker::Lorem.question, 
        assignment_id: Assignment.all[5].id
        )
    Problem.create(
        question: Faker::Lorem.question, 
        assignment_id: Assignment.all[6].id
        )
    Problem.create(
        question: Faker::Lorem.question, 
        assignment_id: Assignment.all[7].id
        )
    Problem.create(
        question: Faker::Lorem.question, 
        assignment_id: Assignment.all[8].id
        )
    Problem.create(
        question: Faker::Lorem.question, 
        assignment_id: Assignment.all[9].id
        )
    Problem.create(
        question: Faker::Lorem.question, 
        assignment_id: Assignment.all[10].id
        )
    Problem.create(
        question: Faker::Lorem.question, 
        assignment_id: Assignment.all[11].id
        )
    Problem.create(
        question: Faker::Lorem.question, 
        assignment_id: Assignment.all[12].id
        )
    Problem.create(
        question: Faker::Lorem.question, 
        assignment_id: Assignment.all[13].id
        )
end

# assignment1 = Assignment.create(name: "Assignment 1", note: "Please get started on this assignment", course_id: algebra.id, due_date: assigned_date)
# assignment2 = Assignment.create(name: "Assignment 2", note: "Please get started on this assignment!!", course_id: algebra.id, due_date: assigned_date)
# assignment3 = Assignment.create(name: "Assignment 3", note: "Please get started on this assignment", course_id: algebra2.id, due_date: assigned_date)

# problem1 = Problem.create(question: "What it do baby?", assignment_id: assignment1.id)
# problem2 = Problem.create(question: "How it do baby???", assignment_id: assignment1.id)
# problem3 = Problem.create(question: "Who it do???", assignment_id: assignment1.id)
# problem4 = Problem.create(question: "Why it does?", assignment_id: assignment1.id)

puts 'done' 