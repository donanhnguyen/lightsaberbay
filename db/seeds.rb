# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

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
    {name: "Den Doko's Lightsaber", forsale: true, color: "green", style: "single", price: 200},
    {name: "Darth Revan's Lightsaber", forsale: true, color: "purple", style: "single", price: 500},
    {name: "Leia's Training Lightsaber", forsale: true, color: "blue", style: "single", price: 50},
    {name: "Rey Skywalker's Lightsaber", forsale: true, color: "yellow", style: "single", price: 300},
    {name: "Count Dooku's Lightsaber", forsale: true, color: "red", style: "single", price: 400},
    {name: "Darth Vuxron's Lightsaber", forsale: true, color: "red", style: "double", price: 200},
    {name: "Suthee Doko's Lightsaber", forsale: true, color: "blue", style: "single", price: 60},
    {name: "Qwan Calister's Lightsaber", forsale: true, color: "green", style: "single", price: 200},
    {name: "Thexan's Lightsaber", forsale: true, color: "yellow", style: "single", price: 700},
    {name: "Vaylin's Lightsaber", forsale: true, color: "yellow", style: "single", price: 250},
    {name: "Senya Tirall's Lightsaber", forsale: true, color: "blue", style: "single", price: 250},
    {name: "Darth Malak's Lightsaber", forsale: true, color: "red", style: "single", price: 450},
    {name: "Vengeance", forsale: true, color: "purple", style: "double", price: 500},
    {name: "Cal Kestis' Lightsaber", forsale: true, color: "blue", style: "single", price: 200},
    {name: "Yoda's Lightsaber", forsale: true, color: "green", style: "single", price: 100},
    {name: "Darth Sedrak's Lightsaber", forsale: true, color: "red", style: "single", price: 400},
    {name: "Darth Aerosai's Lightsaber", forsale: true, color: "red", style: "single", price: 100},
    {name: "Darth Fekora's Lightsaber", forsale: true, color: "red", style: "single", price: 150},
    {name: "Kylo Ren's Lightsaber", forsale: true, color: "red", style: "single", price: 100},
    {name: "Bastilla Shan's Lightsaber", forsale: true, color: "yellow", style: "double", price: 350},
    {name: "Palpatine's Lightsaber", forsale: true, color: "red", style: "single", price: 800},
    {name: "Qui-Gon Jinn's Lightsaber", forsale: true, color: "green", style: "single", price: 150},
    {name: "Lightbringer", forsale: true, color: "green", style: "double", price: 50},
    {name: "Tau Idair's Lightsaber", forsale: true, color: "green", style: "single", price: 300},
])