class CreateLightsaber < ActiveRecord::Migration[5.1]
  def change
    create_table :lightsabers do |t|
      t.string :name, null: false
      t.string :style, null: false
      t.string :color, null: false
      t.integer :price, null: false
      t.boolean :forsale, null: false
      t.references :user, null: false
      t.timestamps
    end
  end
end
