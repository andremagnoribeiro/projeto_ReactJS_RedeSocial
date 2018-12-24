import React, { Component } from "react";
import Post from "./post";
import Button from "@material-ui/core/Button";
import FirebaseService from "../firebaseService";

class PostDetails extends Component {
  constructor() {
    super();
    this.state = {
      post: null
    };
  }

  componentDidMount() {
    // const posts = JSON.parse(localStorage.getItem('savedPosts'));
    // const post = posts.filter(savedPost => {
    //     return savedPost.time == this.props.match.params.time;
    // }).pop();
    // this.setState({post});
    const id = this.props.match.params.id;
    FirebaseService.getData(id, "posts", dataReceived =>
      this.setState({ post: dataReceived })
    );
  }
  onLike(post) {
    FirebaseService.updateLike(post["key"], post.likes + 1, post);
  }
  render() {
    console.log(this.props);
    console.log(this.state);
    if (this.state.post === null) {
      return <div>Loding</div>;
    } else {
      return (
        <div>
          <Post
            post={this.state.post}
            onLike={() => this.onLike(this.state.post)}
            allPost={true}
          />
          {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
          <Button
            style={{ margin: 20 }}
            onClick={() => this.props.history.push("/")}
            variant="contained"
            color="primary"
          >
            Voltar
          </Button>
        </div>
      );
    }
  }
}
export default PostDetails;
