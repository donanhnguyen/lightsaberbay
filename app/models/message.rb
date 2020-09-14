class Message < ApplicationRecord
    belongs_to :user
    validates :sender, :body, presence: true
    validates :read, inclusion: {in: [true, false]}


end
