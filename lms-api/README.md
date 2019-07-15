# Learning Management System API

Learning Management System is an application modeled after Google Classrooms, and Blackboard. Teachers and students collaborate in this system. Teachers are able to create classrooms, announcements, assignments, grade assignments. Students are able to register for those courses and, view announcements, comment on those announcements for assistance or feedback, and submit assignments. Chart.js is utilized to organize grades for both students and teachers. It's an entire application dedication to education management.

## Getting Started
First, fork and clone this repo. Change directory into lms-api. 

### Prerequisites
Ruby and Rails and Postgresql have to be installed on your computer. 

* If it is not installed, start by going in your terminal, and type:

brew install rbenv ruby-build

### Install Ruby
rbenv install 2.6.3
rbenv global 2.6.3
ruby -v (to verify)

### Install Rails
gem install rails -v 5.2.3
rails -v (to verify)

### Install Postgresql
brew install postgresql

Once the Ruby on Rails has been setup and installed, run 

bundle install 
rails db:create 
rails db:migrate 
rails db:seed 
rails server 

seqentially on your terminal to get the rails api started.

## Built With
Ruby on Rails - The api server used

## Authors
Reinald Reynoso

## Acknowledgments
* Flatiron School