require "test_helper"

class TweetsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    @tweet = tweets(:one)
    @token = JsonWebToken.generate_access_token(id: @user.id, email: @user.email)
    @token_two = JsonWebToken.generate_access_token(id: users(:two).id, email: users(:two).email)
  end

  test "should forbid tweets for unlogged users" do
    get tweets_url, as: :json
    assert_response :unauthorized
  end

  test "should show tweets" do
    get(tweets_url, headers: {
      Authorization: "Bearer #{@token}"
    }, as: :json)

    assert_response :success
    json_response = JSON.parse(response.body, symbolize_names: true)
  end

  test "should fetch owner profile tweets" do
    get profile_tweets_url(@user.username), headers: { Authorization: "Bearer #{@token}" }, as: :json
    assert_response :success
  end

  test "should like a tweet" do
    assert_difference("Like.count", 1) do
      assert_difference("TweetLike.count", 1) do
        post(like_tweet_url(@tweet), headers: { Authorization: "Bearer #{@token}" }, as: :json)
      end
    end

    @tweet.reload
    assert_response :created
    assert_equal 1, @tweet.total_likes
  end

  test "should not let user like a tweet they already liked" do
    post(like_tweet_url(@tweet), headers: { Authorization: "Bearer #{@token}" }, as: :json)
    assert_no_difference("Like.count") do
      assert_no_difference("TweetLike.count") do
        post(like_tweet_url(@tweet), headers: { Authorization: "Bearer #{@token}" }, as: :json)
      end
    end

    assert_response :conflict
  end

  test "should unlike a tweet" do
    assert_difference("Like.count", 2) do
      post(like_tweet_url(@tweet), headers: { Authorization: "Bearer #{@token}" }, as: :json)
      post(like_tweet_url(@tweet), headers: { Authorization: "Bearer #{@token_two}" }, as: :json)
    end

    @tweet.reload
    assert_equal 2, @tweet.total_likes

    assert_difference("Like.count", -1) do
      post(unlike_tweet_url(@tweet), headers: { Authorization: "Bearer #{@token}" }, as: :json)
    end

    @tweet.reload
    assert_equal 1, @tweet.total_likes
    assert_response :no_content
  end

  test "should retweet a tweet" do
    assert_difference("Retweet.count", 1) do
      post(retweet_tweet_url(@tweet), headers: { Authorization: "Bearer #{@token_two}" }, as: :json)
    end

    @tweet.reload
    assert_equal 1, @tweet.total_retweets
    assert_response :created
  end
end
