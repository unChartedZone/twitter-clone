require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "should get index" do
    get users_url, as: :json
    assert_response :success
  end

  test "should create user" do
      assert_difference("User.count") do
      post users_url, params: {
        user: {
          bio: @user.bio,
          location: @user.location,
          name: @user.name,
          password: "password123",
          username: "test_user",
          email: "testuser@example.com"
        }
      }, as: :json
    end

    assert_response :created
  end

  test "should show user" do
    get user_url(@user), as: :json
    assert_response :success
  end

  test "should update user" do
    patch user_url(@user), params: {
      user: {
        bio: @user.bio,
        email: @user.email,
        location: @user.location,
        name: @user.name,
        password_digest: @user.password_digest,
        username: @user.username,
        website: @user.website
      } }, as: :json
    assert_response :success
  end

  test "should destroy user" do
    assert_difference("User.count", -1) do
      delete user_url(@user), as: :json
    end

    assert_response :no_content
  end
end
