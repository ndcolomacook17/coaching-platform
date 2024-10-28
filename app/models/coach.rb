class Coach < ActiveRecord::Base
  include HasUuid
  has_many :slots
end
