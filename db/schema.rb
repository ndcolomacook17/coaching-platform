# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_10_27_192629) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "calls", id: :string, force: :cascade do |t|
    t.string "student_id"
    t.string "slot_id"
    t.integer "score"
    t.string "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["slot_id"], name: "index_calls_on_slot_id"
    t.index ["student_id"], name: "index_calls_on_student_id"
  end

  create_table "coaches", id: :string, force: :cascade do |t|
    t.string "name", null: false
    t.string "phone_number", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "slots", id: :string, force: :cascade do |t|
    t.string "coach_id", null: false
    t.string "student_id"
    t.datetime "start_time", null: false
    t.datetime "end_time", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["coach_id"], name: "index_slots_on_coach_id"
    t.index ["student_id"], name: "index_slots_on_student_id"
  end

  create_table "students", id: :string, force: :cascade do |t|
    t.string "name", null: false
    t.string "phone_number", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "calls", "slots"
  add_foreign_key "calls", "students"
  add_foreign_key "slots", "coaches"
  add_foreign_key "slots", "students"
end
