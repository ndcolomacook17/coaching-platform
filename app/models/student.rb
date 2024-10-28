class Student < ActiveRecord::Base
  include HasUuid
  has_many :slots
  has_many :calls
end
