# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# Create coaches
Coach.create([
  {name: "John Smith", phone_number: "1234567890"},
  {name: "William Jenkins", phone_number: "4958607938"},
  {name: "Kelly Quinn", phone_number: "0394857362"},
  {name: "Penny Trenton", phone_number: "02938412"},
])

# Create students
Student.create([
  {name: "Alice Johnson", phone_number: "1234567890"},
  {name: "Kevin Holmes", phone_number: "94059382"},
  {name: "Quentin Michaels", phone_number: "1029342122"},
  {name: "James Godwin", phone_number: "94039584723"},
])

Coach.pluck(:id).each do |coach_id|
  Slot.create([
    {coach_id: coach_id, start_time: DateTime.current.beginning_of_hour, end_time: DateTime.current.beginning_of_hour + 2.hours},
    {coach_id: coach_id, start_time: DateTime.current.beginning_of_hour - 1.day, end_time: (DateTime.current.beginning_of_hour - 1.day) + 2.hours},
    {coach_id: coach_id, start_time: DateTime.current.beginning_of_hour + 1.day, end_time: (DateTime.current.beginning_of_hour + 1.day) + 2.hours},
  ])
end

filled_slot = Slot.create({coach_id: Coach.first.id, student_id: Student.first.id, start_time: DateTime.current.beginning_of_hour - 1.day, end_time: (DateTime.current.beginning_of_hour - 1.day) + 2.hours})
Call.create({student_id: Student.first.id, slot_id: filled_slot.id, score: 5, notes: "Great call!"})
