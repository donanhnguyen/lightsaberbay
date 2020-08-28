class Expense < ApplicationRecord
    belongs_to :budget
    validates :category, :description, :date, :amount, presence: true

end
