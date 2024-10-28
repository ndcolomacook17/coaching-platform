class Slot < ActiveRecord::Base
  include HasUuid
  belongs_to :coach
  belongs_to :student, optional: true
  has_one :call

  scope :active_or_upcoming_as_of, lambda { |current_time = Time.zone.now|
  where(
    "((#{table_name}.start_time <= ? AND
     (#{table_name}.end_time > ?)) OR
     (#{table_name}.start_time >= ?)
     )",
    current_time,
    current_time,
    current_time,
  )
}

end
