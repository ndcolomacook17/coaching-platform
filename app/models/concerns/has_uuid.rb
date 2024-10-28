module HasUuid
  extend ActiveSupport::Concern

  included do
    before_create :set_id
  end

  private

  def set_id
    self.id = SecureRandom.uuid
  end
end
