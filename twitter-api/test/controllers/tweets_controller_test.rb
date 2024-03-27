require 'test_helper'

class TweetsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    @tweet = tweets(:one)
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

  test "should like a tweet" do
    token = JsonWebToken.generate_access_token(id: @user.id, email: @user.email)
    assert_difference('Like.count', 1) do
      assert_difference('TweetLike.count', 1) do
        post(like_tweet_url(@tweet), headers: { Authorization: "Bearer #{token}" }, as: :json)
      end
    end

    @tweet.reload
    assert_response :created
    assert_equal 1, @tweet.total_likes
  end

  test "should not let user like a tweet they already liked" do
    token = JsonWebToken.generate_access_token(id: @user.id, email: @user.email)
    post(like_tweet_url(@tweet), headers: { Authorization: "Bearer #{token}" }, as: :json)
    assert_no_difference('Like.count') do
      assert_no_difference('TweetLike.count') do
        post(like_tweet_url(@tweet), headers: { Authorization: "Bearer #{token}" }, as: :json)
      end
    end

    assert_response :conflict
  end
end
