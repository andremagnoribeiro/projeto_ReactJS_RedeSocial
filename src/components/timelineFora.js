import React, { Component } from "react";
import Post from "./post";
import PostCreator from "./postCreator";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/MoreVert";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import List from "@material-ui/core/List";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Collapse from "@material-ui/core/Collapse";
import ListSubheader from "@material-ui/core/ListSubheader";

class Timeline extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      loading: false,
      open: false,
      openMudarUsuario: false,
      direcao: "left",
      idUserAtual: -1,
      nameUsuarioAtual: "Faça Login",
      imageUsuarioAtual:
        "https://www.voipdobrasil.com.br/blog/images/usuario.png",
      openList: false,
      users: []
    };
  }

  componentDidMount() {
    console.log("App did mount");
    // this.readFromStorage();
    this.readFromAPI();
    this.getImageUsuario();
    this.readUsers();
  }

  insertPost(post) {
    const myPosts = this.state.posts;
    myPosts.unshift(post);
    this.setState({ posts: myPosts });
    this.saveInStorage();
  }

  saveInAPI(post) {
    this.setState({ loading: true });
    axios.post("http://localhost:3001/posts", post).then(response => {
      const myPosts = this.state.posts;
      myPosts.unshift(response.data);
      this.setState({ posts: myPosts, loading: false });
    });
  }

  readFromStorage() {
    const savedPosts = localStorage.getItem("savedPosts");
    if (savedPosts) {
      this.setState({ posts: JSON.parse(savedPosts) });
    }
  }

  readFromAPI() {
    axios.get("http://localhost:3001/posts").then(response => {
      this.setState({ posts: response.data });
    });
  }

  saveInStorage() {
    const posts = JSON.stringify(this.state.posts);
    localStorage.setItem("savedPosts", posts);
  }

  onNavigate(post) {
    this.props.history.push("/post/" + post.id);
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  getImageUsuario() {
    if (this.state.idUserAtual != -1) {
      axios
        .get("http://localhost:3001/author/" + this.state.idUserAtual)
        .then(response => {
          this.setState({ imageUsuarioAtual: response.data.image });
          this.setState({ nameUsuarioAtual: response.data.name });
        });
    }
  }
  readUsers() {
    axios.get("http://localhost:3001/author").then(response => {
      this.setState({ users: response.data });
    });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    console.log("asdfasdfasdf4444", this.state.idUserAtual);
  };
  render() {
    console.log(this.props);
    return (
      <div style={{ textAlign: "center" }}>
        <AppBar position="fixed">
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Persistent drawer
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer variant="persistent" anchor="left" open={this.state.open}>
          <div>
            <IconButton onClick={this.handleDrawerClose}>
              {this.state.direcao === "left" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" src={this.state.imageUsuarioAtual} />
            }
            title={this.state.nameUsuarioAtual}
          />
          <Divider />

          <List component="nav">
            <ListItem
              button
              onClick={() => {
                this.state.openMudarUsuario
                  ? this.setState({ openMudarUsuario: false })
                  : this.setState({ openMudarUsuario: true });
              }}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText inset primary="Login" />
              {this.state.openMudarUsuario ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={this.state.openMudarUsuario}
              timeout="auto"
              unmountOnExit
            >
              {console.table(this.state.users)}
              {this.state.users.map(user => (
                <List component="div" disablePadding>
                  <ListItem
                    button
                    onClick={() => {
                      this.setState({ idUserAtual: user.id });
                      this.setState({ imageUsuarioAtual: user.image });
                      this.setState({ nameUsuarioAtual: user.name });
                    }}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText inset primary={user.name} />
                  </ListItem>
                </List>
              ))}
            </Collapse>
          </List>
          <List>
            {["Sair"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon />
                <InboxIcon />
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        <h1 style={{ color: "blue" }}>Minha rede social</h1>

        {this.state.posts.length > 0 ? (
          this.state.posts.map((post, i) => {
            return (
              <Post
                onNavigate={() => this.onNavigate(post)}
                key={post.time}
                post={post}
              />
            );
          })
        ) : (
          <CircularProgress />
        )}
      </div>
    );
  }
}

export default Timeline;
/*
        <PostCreator
          isLoading={this.state.loading}
          onCreate={this.saveInAPI.bind(this)}
          idAuthorAtual={this.state.idAuthorAtual}
        />*/
