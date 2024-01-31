require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "should get users" do
    get users_url, as: :json
    assert_response :success
    json_response = JSON.parse(self.response.body, symbolize_names: true)
    assert_equal users.size, json_response.size
  end

  test "should get user" do
    get user_url(@user), as: :json
    assert_response :success
    json_response = JSON.parse(self.response.body, symbolize_names: true)
    assert_equal @user.email, json_response[:email]
    assert_equal @user.username, json_response[:username]
  end

  test "should update user" do
    patch user_url(@user), params: { user: { name: "Another name", dateOfBirth: "10/10/1989" } }, headers: { Authorization: "Bearer #{JsonWebToken.generate_access_token(@user)}" }, as: :json
    assert_response :success
    json_response = JSON.parse(self.response.body, symbolize_names: true)
    puts json_response
    assert_equal "Another name", json_response[:data][:attributes][:name]
    assert_equal "1989-10-10", json_response[:data][:attributes][:dateOfBirth]
  end

  test "should not update user if not the owner" do
    patch user_url(users(:two)), params: { name: "New name" }, headers: { Authorization: "Bearer #{JsonWebToken.generate_access_token(@user)}" }, as: :json
    assert_response :forbidden
  end

  test "should get current self" do
    get me_url, headers: { Authorization: "Bearer #{JsonWebToken.generate_access_token(@user)}" }, as: :json
    assert_response :success
    json_response = JSON.parse(self.response.body, symbolize_names: true)
    assert_equal @user.email, json_response.dig(:data, :attributes, :email)
  end

  test "should not get current self if not authenticated" do
    get me_url, as: :json
    assert_response :unauthorized
  end

  # TODO: implement these tests
  test "update profile image" do
  end
  test "update banner image" do
  end
end