require 'rubygems'
require 'bundler/setup'
Bundler.require(:default)
DATABASE = SQLite3::Database.new("students.db")
DATABASE.results_as_hash = true

require_relative "student"

get "/" do
  erb :homepage
end

get "/students" do
  students = Student.all
  students_hash = students.map {|s| s.to_hash}
  students_hash.to_json
end

post "/student" do
  student = Student.find(params[:id])
  student_hash = student.to_hash
  student_hash.to_json
end

post "/students/edit" do
  student = Student.find(params[:id])
  student.edit({"name" => params[:name], "age" => params[:age], 
    "github" => params[:github]}).save
  student.to_hash.to_json
end

post "/students/insert" do
  student = Student.new(params)
  student.insert
  student.to_hash.to_json
end

post "/students/delete" do
  student = Student.find(params[:id])
  student.delete
  student.to_hash.to_json
end

post "/students/:id/ultra-wise" do
  student = Student.find(params[:id])
  if student.ultra_wise?
    "This Student is ultra wise!"
  else
    "This Student is not ultra wise"
  end
end

post "/students/:id/can-drink" do
  student = Student.find(params[:id])
  if student.can_drink?
    "This Student can drink!"
  else
    "This Student is underage!"
  end
end

# Afternoon Assignment:

# - Add a route that modifies a student record. There's no need for a page that shows a form for editing. We're just working with request paths directly. (Use 'get' instead of 'post' to make it easier to check that things work. Once it's working, change it to 'post'.)

# - Add routes for creating and deleting students, too.

# - Add a route that returns if a particular student is ultra wise. And one for whether the student can drink.

# - Change the application as needed so that the routes I wrote above return whether students can drink, whether they're ultra wise, and their GitHub *link* in the JSON response.

# From the console, you should be able to use `XMLHttpRequest` to make requests to these paths and parse the responses as JSON, just like we went over together.

## DOM Exercises

# - Add links to various routes on the homepage.
# - Clicking a link should create an `XMLHttpRequest` to that path.
# - Display the result in some elegant way in an alert to the user.
# - Change your code so that the result displays on the page somewhere instead.
# - Some of the routes above change information in the database and therefore need user-submitted information. Those are harder to implement, so save them as a bonus for the end. (Look into FormData.)