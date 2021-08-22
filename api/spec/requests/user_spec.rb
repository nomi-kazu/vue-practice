require "rails_helper"

RSpec.describe User, type: :request do
  require "rails_helper"

  describe "User" do
    before(:each) do
      @status_code_ok = 200
    end
    it "ユーザーを表示" do
      @user = FactoryBot.create(:user)
      get "/users/"
      @json = JSON.parse(response.body)
      expect(response.status).to eq(@status_code_ok)
    end
  end
end