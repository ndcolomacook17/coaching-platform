class Call < ActiveRecord::Base
  include HasUuid
  belongs_to :student
  belongs_to :slot
  has_one :coach, through: :slot
end
