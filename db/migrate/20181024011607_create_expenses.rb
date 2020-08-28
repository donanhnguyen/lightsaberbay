class CreateExpenses < ActiveRecord::Migration[5.1]
  def change
    create_table :expenses do |t|
      t.string :category, null: false
      t.string :description, null: false
      t.string :date, null: false
      t.integer :amount, null: false
      t.references :budget, null: false
      t.timestamps
    end
  end
end
