class CallController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    calls = Call.all.order(created_at: :desc)
    render json: calls
  end

  def create
    call = Call.create!(**call_params)
    if call.save
      render json: call
    else
      render json: { errors: call.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    call = Call.find(call_params[:id])
    call.update(**call_params.except(:id))
    render json: call
  end

  private

  def call_params
    params.permit(:id, :student_id, :slot_id, :score, :notes)
  end
end
