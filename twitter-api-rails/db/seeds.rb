require 'faker'
# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

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
