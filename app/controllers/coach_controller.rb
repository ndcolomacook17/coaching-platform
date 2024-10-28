class CoachController < ApplicationController
  def index
    coaches = Coach.all.order(created_at: :desc)
    render json: coaches
  end

  def show
    coach = Coach.find(params[:id])
    render json: present_coach(coach)
  end

  private

  def present_coaches(coaches)
    coaches.map do |coach|
      present_coach(coach)
    end
  end

  def present_coach(coach)
    {
     **coach.attributes.as_json,
     slots: present_slots(coach.slots),
    }
  end

  def present_slots(slots)
    slots.map do |slot|
      {
       **slot.attributes.as_json,
       call:
       {
          id: slot.call&.id,
         student_name: slot.call&.student&.name,
         student_phone_number: slot.call&.student&.phone_number,
         score: slot.call&.score,
         notes: slot.call&.notes,
       },
      }
    end
  end
end
