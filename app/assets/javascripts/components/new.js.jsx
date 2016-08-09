var New = React.createClass ({

  handleClick(e) {

  	e.preventDefault();

    let text = this.refs.text.value;

    $.ajax({
      url: '/new',
      type: 'POST',
      data: { post: { text: text} },
      success: (post) => {
        $('.post-feed').prepend('<div class="tweet-box"><p class="tweet-text">'+ post.text +'</p><div class="tweet-stamps">Just Now</div></div>')
        console.log(post.text);
      }
    });
  },
  handleSubmit(post) {
  	this.refs.text.value = "";
  	$.ajax({
  	  url: '/posts',
  	  type: 'GET',
  	  dataType: 'json' ,
  	    success: (posts) => {
  	    console.log(posts);
  	  }
  	});
  	
  },
	
	render: function() {
		return(	<div>
							<div className="post-div">
							<form>
								<input className="form-control" ref='text' placeholder='Post Something' />
								<button className="btn btn-primary" onClick={this.handleClick}>Submit</button>
								</form>
							</div>
						</div>

			)
	}
})
