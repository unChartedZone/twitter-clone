require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test 'user with a valid email should be valid' do
    user = User.new(
      username: 'test',
      name: 'test',
      email: 'test@test.com',
      password_digest: 'test'
    )

    assert user.valid?
  end

  test 'user with taken email should be invalid' do
    # should be invalid because of user one
    user = User.new(
      username: 'test',
      name: 'test',
      email: 'one@one.org',
      password_digest: 'test'
    )
    assert_not user.valid?
  end
end
