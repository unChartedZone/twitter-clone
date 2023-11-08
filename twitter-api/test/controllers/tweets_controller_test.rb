require 'test_helper'

class TweetsControllerTest < ActionDispatch::IntegrationTest
  setup do

  end

  test "should forbid tweets for unlogged users" do
    get tweets_url, as: :json
    assert_response :unauthorized
  end

  test "should show tweets" do
    get(tweets_url, headers: {
      Authorization: "Bearer #{JsonWebToken.generate_access_token(id: users(:one).id, email: users(:one).email)}"
    }, as: :json)

    assert_response :success
    json_resposne = JSON.parse(response.body, symbolize_names: true)
  end
end