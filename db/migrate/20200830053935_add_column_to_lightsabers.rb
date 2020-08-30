class AddColumnToLightsabers < ActiveRecord::Migration[5.1]
  def change
    add_column :lightsabers, :lat, :float
    add_column :lightsabers, :lng, :float
  end
end
