class PostsController < ApplicationController

	def index
		@posts = Post.all.reverse_order
		render json: @posts
	end
end