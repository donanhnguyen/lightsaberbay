class Lightsaber < ApplicationRecord

    belongs_to :user
    validates :color, :type, :name, :forsale, presence: true

    validates :user_id, uniqueness: { scope: [:name] }
end
