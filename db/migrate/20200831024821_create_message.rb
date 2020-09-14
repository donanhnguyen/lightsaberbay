class CreateMessage < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.string :sender, null: false
      t.references :user, null: false
      t.string :body, null: false
      t.boolean :read, null: false
      t.timestamps
    end
  end
end
