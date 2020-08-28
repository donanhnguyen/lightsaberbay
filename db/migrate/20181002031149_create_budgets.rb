class CreateBudgets < ActiveRecord::Migration[5.1]
  def change
    create_table :budgets do |t|
      t.string :month, null: false
      t.integer :year, null: false
      t.references :user, null: false
      t.integer :salary, null: false
      t.timestamps
    end
  end
end
