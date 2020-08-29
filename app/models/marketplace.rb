class Marketplace < ApplicationRecord
    has_many :lightsabers
    validates :name, presence: true

end
