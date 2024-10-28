class StudentController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    students = Student.all.order(created_at: :desc)
    render json: students
  end

  def show
    student = Student.find(params[:id])
    render json: present_student(student)
  end

  def present_student(student)
    {
     **student.attributes.as_json,
     calls: present_calls(student.calls),
    }
  end

  def present_calls(calls)
    calls.map do |call|
      {
       **call.attributes.as_json,
        coach_name: call&.coach&.name,
        coach_phone_number: call&.coach&.phone_number,
        start_time: call.slot.start_time,
        end_time: call.slot.end_time,
      }
    end
  end
end
