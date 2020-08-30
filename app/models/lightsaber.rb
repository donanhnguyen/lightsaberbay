class Lightsaber < ApplicationRecord

    belongs_to :user
    validates :color, :style, :name, :forsale, :price, presence: true

    validates :user_id, uniqueness: { scope: [:name] }
end
