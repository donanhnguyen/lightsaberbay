class Lightsaber < ApplicationRecord

    belongs_to :user
    validates :name, :style, :price, :color, :user_id, presence: true
    validates :forsale, inclusion: {in: [true, false]}

    # validates :user_id, uniqueness: { scope: [:name] }
end
