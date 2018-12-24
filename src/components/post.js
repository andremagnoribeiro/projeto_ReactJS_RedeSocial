import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import LikeIcon from "@material-ui/icons/ThumbUp";
import Avatar from "@material-ui/core/Avatar";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import FirebaseService from "../firebaseService";
import DeleteIcon from "@material-ui/icons/Delete";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import axios from "axios";
import "../post.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      openMudarUsuario: false,

      likes: props.post.initialLikes,
      anchorEl: null
    };
  }
  componentDidMount() {
    this.readUserDataBase();
  }

  readUserDataBase() {
    FirebaseService.getData(this.props.post.author, "users", dataReceived =>
      this.setState({ user: dataReceived })
    );
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  open() {}

  render() {
    const post = this.props.post;

    return (
      <Card style={{ margin: 40 }}>
        {this.state.user ? (
          <CardContent>
            <CardHeader
              avatar={
                <Avatar aria-label="Recipe" src={this.state.user.imageUser} />
              }
              title={this.state.user.name}
              subheader={post.date}
              action={
                <IconButton
                  aria-label="More"
                  aria-owns={this.state.anchorEl ? "simple-menu" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
              }
            />
          </CardContent>
        ) : (
          <div />
        )}
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <IconButton
            style={{ top: -5 }}
            aria-label="Delete"
            onClick={this.props.onRemove}
          >
            <DeleteIcon fontSize="large" />
          </IconButton>
        </Menu>
        <Collapse
          style={{ left: 300, zIndex: 2 }}
          in={this.state.openMudarUsuario}
          timeout="auto"
          unmountOnExit
        >
          <List />
        </Collapse>
        <CardContent>
          <Typography align="center" component="h5" variant="display1">
            {post.title}
          </Typography>
        </CardContent>
        <CardMedia
          //onClick={this.aaaremove()}
          onClick={this.props.onNavigate}
          style={{ height: 0, paddingTop: "56.25%" }}
          image={post.image}
          title="Paella dish"
        />

        {this.props.allPost ? (
          <CardContent>
            <Typography component="p">{post.text}}</Typography>
          </CardContent>
        ) : (
          <div />
        )}

        <CardActions>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              height: 40
            }}
          >
            <p>Likes: {post.likes}</p>

            <IconButton onClick={this.props.onLike}>
              <LikeIcon fontSize="small" />
            </IconButton>
          </div>
        </CardActions>
      </Card>
    );
  }
}

export default Post;
