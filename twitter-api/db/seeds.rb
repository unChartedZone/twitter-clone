require 'faker'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# create my account
User.create!(
  username: "chris",
  email: "chris@example.com",
  password: "password123",
  name: "Chris Valdez",
  birth_date: Date.parse('31-12-2010'),
  bio: "I code"
)

# create guest account
User.create!(
  username: "guest",
  email: "guest@example.com",
  password: "Guest123",
  name: "Guest McGuestFace",
  birth_date: Date.parse('31-12-2010'),
)

USER_COUNT = 50

USER_COUNT.times do
  User.create!(
    username: Faker::Internet.unique.username(specifier: 5..10),
    email: Faker::Internet.unique.email,
    password: 'password123',
    name: Faker::Name.name,
    birth_date: Faker::Date.between(from: '1980-01-01', to: '2025-01-01'),
    bio: Faker::Lorem.sentence(word_count: 10)
  )
end

users = User.all
100.times do
  Tweet.create!(
    user: users.sample,
    text: Faker::Lorem.sentence(word_count: rand(5..20))
  )
end
