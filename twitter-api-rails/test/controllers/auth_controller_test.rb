require "test_helper"

class AuthControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "should signup user successfully" do
    assert_difference("User.count") do
      post signup_url, params: {
        user: {
          username: "bootsie",
          email: "bootsie@test.com",
          password: "password123",
          name: "Bootsie Valdez"
        }
      }, as: :json
    end

    assert_response :created
  end

  test "should not signup user with taken email" do
    assert_no_difference("User.count") do
      post signup_url, params: {
        user: {
          username: "johnny",
          email: @user.email,
          password: "password123",
          name: "Johnny"
        }
      }, as: :json
    end

    assert_response :unprocessable_entity
  end

  test "should not signup user with taken username" do
    assert_no_difference("User.count") do
      post signup_url, params: {
        user: {
          username: @user.username,
          email: "johnny@example.com",
          password: "password123",
          name: "Johnny"
        }
      }, as: :json
    end

    assert_response :unprocessable_entity
  end

  test "should login successfully" do
    post login_url, params: {
      user: {
        email: @user.email,
        password: "password123"
      }
    }, as: :json

    assert_response 200
  end

  test "should login unsuccessfully" do
    post login_url, params: {
      user: {
        email: @user.email,
        password: "bad_pas$$"
      }
    }, as: :json

    assert_response 401
  end

  test "should refresh user" do
    refresh_token = JsonWebToken.generate_refresh_token(@user)
    post refresh_url, headers: {
      Cookie: "refresh_token=#{refresh_token}; path=/; expires=Wed, 21 Jun 2023 23:01:13 GMT; secure; HttpOnly; SameSite=Lax"
    }

    assert_response 200
  end

  test "should not refresh user with invalid token" do
    refresh_token = "owfowf2r23"
    post refresh_url, headers: {
      Cookie: "refresh_token=#{refresh_token}; path=/; expires=Wed, 21 Jun 2023 23:01:13 GMT; secure; HttpOnly; SameSite=Lax"
    }
    assert_response 401
  end
end
