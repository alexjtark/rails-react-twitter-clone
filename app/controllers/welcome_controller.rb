class WelcomeController < ApplicationController
	respond_to :html, :json

	def index
		@posts = Post.all.reverse_order
	end

	def create
		@post = Post.new(post_params)
		if @post.save
			render json: @post
		else
			render json: @post.errors
		end
	end

	private

	def post_params
		params.require(:post).permit(:text)
	end
end