# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

mainMarketplace = Marketplace.create(name: "Main Marketplace")
admin = User.create!(
    username: "admin",
    password_digest: "sex",
    session_token: "sex",
    credits: 1000000,
)

defaultLightsabers = admin.lightsabers.create!([
    {name: "Satele Shan's Lightsaber", forsale: true, color: "blue", style: "double", price: 100, lat: 30.35172619845982, lng: -97.51282373046872},
    {name: "Darth Malgus' Lightsaber", forsale: true, color: "red", style: "single", price: 100, lat: 30.35172619845982, lng: -97.51282373046875},
    {name: "Luke Skywalker's Lightsaber", forsale: true, color: "green", style: "single", price: 70, lat: 31.35172619845982, lng: -97.51282373046875},
    {name: "Arcann's Lightsaber", forsale: true, color: "yellow", style: "single", price: 200, lat: 31.35172619845982, lng: -97.51282373046878},
    {name: "Anakin Skywalker's Lightsaber", forsale: true, color: "blue", style: "single", price: 100, lat: 30.35172619845982, lng: -97.51282373046872},
    {name: "Darth Vader's Lightsaber", forsale: true, color: "red", style: "single", price: 100, lat: 30.35172619845982, lng: -97.51282373046875},
    {name: "Ven Zallow's Lightsaber", forsale: true, color: "green", style: "single", price: 70, lat: 31.35172619845982, lng: -97.51282373046875},
    {name: "Mace Windu's Lightsaber", forsale: true, color: "purple", style: "single", price: 600, lat: 31.35172619845982, lng: -97.51282373046878},
    {name: "Handa Vyos' Lightsaber", forsale: true, color: "yellow", style: "double", price: 100, lat: 30.35172619845982, lng: -97.51282373046872},
    {name: "Darth Maul's Lightsaber", forsale: true, color: "red", style: "double", price: 100, lat: 30.35172619845982, lng: -97.51282373046875},
    {name: "Obi-Wan Kenobi's Lightsaber", forsale: true, color: "blue", style: "single", price: 70, lat: 31.35172619845982, lng: -97.51282373046875},
])