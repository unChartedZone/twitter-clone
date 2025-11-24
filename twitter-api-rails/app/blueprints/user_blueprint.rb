class UserBlueprint < ApplicationBlueprint
  identifier :id

  # Core user attributes
  fields :username, :email, :name
  field(:profile_image) { |user| user.profile_image_url }

  view :full do
    fields :birth_date, :bio, :website, :location

    field :join_date do |user|
      user.created_at
    end

    field(:total_tweets) { |user| user.tweets_count }
    field(:total_followers) { |user| user.followers_count }
    field(:total_following) { |user| user.followings_count }
    field(:banner_image) { |user| user.banner_image_url }
    field :is_following do |user, options|
      options[:current_user].present? && options[:current_user].following.find(user.id).present?
    rescue ActiveRecord::RecordNotFound
      false
    end
  end
end
