var Post = React.createClass ({

	render: function() {
		return 	<div>
						<div className="tweet-box">
							<p className="tweet-text">{this.props.text}</p>
							<div className="tweet-stamps">{this.props.timestamps}</div>
							</div>
						</div>;
	}
})