import React, { Component } from "react";
import Post from "./post";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import FirebaseService from "../firebaseService";

class PostsUser extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      userAtual: null
    };
  }

  componentDidMount() {
    if (localStorage.getItem("loginUsuarioSession")) {
      this.setState({
        userAtual: JSON.parse(localStorage.getItem("loginUsuarioSession"))
      });
    }
    this.readPostDataBase();
  }

  readPostDataBase() {
    FirebaseService.getDataList("posts", dataReceived =>
      this.setState({ posts: dataReceived })
    );
  }
  render() {
    console.log(this.props);
    console.log(this.state);
    console.log(this.userAtual);
    console.table(this.state.posts);
    return (
      <div>
        {this.state.posts.length > 0 ? (
          this.state.posts.map((post, i) => {
            if (post.author == this.state.userAtual.key) {
              return (
                <Post
                  onNavigate={() => this.onNavigate(post)}
                  key={post.time}
                  post={post}
                />
              );
            }
          })
        ) : (
          <CircularProgress />
        )}
      </div>
    );
  }
}
export default PostsUser;
