var Post = React.createClass({

  render: function() {
    return (
      <div className="tweet-box">
         {this.props.text}
         <div className="tweet-stamps">
         {this.props.created_at}
         </div>
      </div>
    );
  }
});

var PostDiv = React.createClass({
  loadPostsFromServer: function() {
    $.ajax({
      url: '/posts',
      dataType: 'json',
      type: 'GET',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handlePosttSubmit: function(post) {
  	console.log(post)
    var posts = this.state.data;

    post.id = Date.now();
    var newPost = posts.concat([post]);
    this.setState({data: newPost});
    $.ajax({
      url: '/new',
      dataType: 'json',
      type: 'POST',
      data: { post: { text: post.text} },
      success: function(data) {
        this.setState({data: posts});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: posts});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadPostsFromServer();
    setInterval(this.loadPostsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="post-div">
        <PostForm onPostSubmit={this.handlePosttSubmit} />
        <PostList data={this.state.data} />
      </div>
    );
  }
});

var PostList = React.createClass({
  render: function() {
    var postNodes = this.props.data.map(function(post) {
      return (
        <Post text={post.text} key={post.id} created_at={post.created_at}>
          {post.text}
        </Post>
      );
    });
    return (
      <div className="commentList">
        {postNodes}
      </div>
    );
  }
});

var PostForm = React.createClass({
  getInitialState: function() {
    return {text: ''};
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var text = this.state.text.trim();
    if (!text) {
      return;
    }
    this.props.onPostSubmit({text: text});
    this.setState({text: ''});
  },
  render: function() {
    return (
    	<div className="post-div">
	      <form className="post-form" onSubmit={this.handleSubmit}>
	        <input className="post-input" type="text" placeholder="Say Something..." value={this.state.text} onChange={this.handleTextChange}/>
	        <input className="btn btn-primary button" type="submit" value="Post" />
	      </form>
      </div>
    );
  }
});

ReactDOM.render(
  <PostDiv  pollInterval={3000} />,
  document.getElementById('post-feed')
);
