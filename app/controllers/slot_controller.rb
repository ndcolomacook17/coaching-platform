class SlotController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    slots = if query_params.present?
      Slot.active_or_upcoming_as_of.where(**query_params).order(created_at: :desc)
    else
      Slot.all.order(created_at: :desc)
    end
    render json: present_slots(slots)
  end

  def create
    slot = Slot.create!(**slot_params.except(:id).merge({end_time: slot_params[:start_time] + 2.hours}))
    if slot.save
      render json: slot
    else
      render json: { errors: slot.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    slot = Slot.find(slot_params[:id])
    slot.update(student_id: slot_params[:student_id])
    render json: slot
  end

  private

  def present_slots(slots)
    slots.map do |slot|
      {
       **slot.attributes.as_json,
       coach_name: slot.coach&.name,
       coach_phone_number: slot.coach&.phone_number,
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

  def slot_params
    permitted_params = params.permit(:id, :coach_id, :student_id, :start_time, :end_time)
    permitted_params[:start_time] = DateTime.parse(permitted_params[:start_time]) if permitted_params[:start_time]
    permitted_params
  end

  def query_params
    params.permit(:empty_student_id)
    params[:student_id] = nil if params[:empty_student_id] == 'true'
    params.permit(:student_id)
  end
end
