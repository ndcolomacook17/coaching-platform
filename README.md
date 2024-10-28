# README

## Local setup
1. Install dependencies, seed data:
```
# FE deps
yarn install

# BE deps
bundle install

# Init db
rails db:create
rails db:migrate
rails db:seed

# Reseeding
rails db:truncate_all db:migrate db:seed
```
2. To run the app:
```
rails s
./bin/webpack-dev-server
```
3. To nav to the main pages, let's grab some relevant IDs from our test data:
```ruby
coach_id = Coach.first.id
student_id = Student.first.id
call_id = Call.first.id
```
4. For the coach view: `http://localhost:3000/profile/<coach_id>`
5. For the student view: `http://localhost:3000/student_profile/<student_id>`
6. For a call review view: `http://localhost:3000/call_review/:id`

## Assumptions
- Had wepback dependency issues trying to use MUIs date picker so I used a dropdown that provided the next 10 hours (on the hour) for slot creation. This could be extended to approximate functional parity with a date pickey by adding another month and day dropdown then dynamically showing the hours dropdown.

## Extensions
I wasn't able to get to the validation layer slot logic but if I had time I would've implemented the following validations at the Active Record level:
- No overlapping coach slots for a coach- check range between start and end time for records matching with coach_id fk before_save on Slot creates and updates
- No overlapping student calls for a student- check range between start and end time for records matching with student_id fk before_save on Call creates and updates
- Data type validations for phone numbers

Other extensions:
- Dynamically hiding "Review" button on coach profile view if the slot is not completed and doesn't have a student id fk.
- Resolving "invalid time value" bug on FE once you "Book Call" as the student view. Requires reloading the page so assuming it is with respect to not calling the call setter early enough.
- Would've heavily refactored the FE to DRY it up, generalize some date helpers, and split up the list views for slots and calls by "active" and "upcoming" for a clearer UX

