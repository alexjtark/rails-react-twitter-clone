var New = React.createClass ({
  handleClick(e) {

  	e.preventDefault();
  	
    let text    = this.refs.text.value;

    $.ajax({
      url: '/new',
      type: 'POST',
      data: { post: { text: text} },
      success: (post) => {
        this.props.handleSubmit(post);
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