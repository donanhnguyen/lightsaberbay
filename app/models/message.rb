class Message < ApplicationRecord
    belongs_to :user
    validates :sender, :body, presence: true
end
