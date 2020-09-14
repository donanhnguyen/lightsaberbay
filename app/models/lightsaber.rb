class Lightsaber < ApplicationRecord

    belongs_to :user
    validates :name, :style, :price, :color, :user_id, presence: true
    validates :forsale, inclusion: {in: [true, false]}

end
