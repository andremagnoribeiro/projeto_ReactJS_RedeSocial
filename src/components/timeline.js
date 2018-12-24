import React, { Component } from "react";
import Post from "./post";
import CircularProgress from "@material-ui/core/CircularProgress";

import FirebaseService from "../firebaseService";

class Timeline extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      readAcabou: false
    };
  }

  componentDidMount() {
    this.readPostDataBase();
  }

  async readPostDataBase() {
    FirebaseService.getDataList("posts", dataReceived => {
      this.setState({ posts: dataReceived });
    });
    this.setState({ readAcabou: true });
  }

  onLike(post) {
    FirebaseService.updateLike(post["key"], post.likes + 1, post);
  }

  onRemove(post) {
    FirebaseService.removeDataBase(post["key"], "posts");
    this.props.history.push("/");
  }
  onNavigate(post) {
    this.props.history.push("/post/" + post["key"]);
  }

  render() {
    return (
      <div style={{ marginTop: 70 }}>
        {this.state.posts.length > 0
          ? this.state.posts.map((post, i) => {
              return (
                <Post
                  onNavigate={() => this.onNavigate(post)}
                  onRemove={() => this.onRemove(post)}
                  onLike={() => this.onLike(post)}
                  key={post["key"]}
                  post={post}
                  allPost={false}
                />
              );
            })
          : undefined}

        {this.state.posts > 0 || this.state.readAcabou ? (
          undefined
        ) : (
          <CircularProgress
            style={{ position: "absolute", top: 80, left: "50%" }}
          />
        )}
      </div>
    );
  }
}

export default Timeline;
