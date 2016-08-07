class WelcomeController < ApplicationController
	respond_to :html, :json

	def index
		@posts = Post.all
	end
end