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
    {name: "Satele Shan's Lightsaber", forsale: true, color: "blue", style: "double", price: 100},
    {name: "Darth Malgus' Lightsaber", forsale: true, color: "red", style: "single", price: 100},
    {name: "Luke Skywalker's Lightsaber", forsale: true, color: "green", style: "single", price: 70},
    {name: "Arcann's Lightsaber", forsale: true, color: "yellow", style: "single", price: 200},
    {name: "Anakin Skywalker's Lightsaber", forsale: true, color: "blue", style: "single", price: 100},
    {name: "Darth Vader's Lightsaber", forsale: true, color: "red", style: "single", price: 150},
    {name: "Ven Zallow's Lightsaber", forsale: true, color: "green", style: "single", price: 70},
    {name: "Mace Windu's Lightsaber", forsale: true, color: "purple", style: "single", price: 600},
    {name: "Handa Vyos' Lightsaber", forsale: true, color: "yellow", style: "double", price: 100},
    {name: "Darth Maul's Lightsaber", forsale: true, color: "red", style: "double", price: 100},
    {name: "Obi-Wan Kenobi's Lightsaber", forsale: true, color: "blue", style: "single", price: 70},
    {name: "Count Dooku's Lightsaber", forsale: true, color: "red", style: "single", price: 400},
    {name: "Den Doko' Lightsaber", forsale: true, color: "green", style: "single", price: 200},
    {name: "Darth Revan's Lightsaber", forsale: true, color: "purple", style: "single", price: 500},
    {name: "Leia's Training Lightsaber", forsale: true, color: "blue", style: "single", price: 50},
    {name: "Rey Skywalker's Lightsaber", forsale: true, color: "yellow", style: "single", price: 300},
])