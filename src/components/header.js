import React, { Component } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import FirebaseService from "../firebaseService";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      loading: false,
      open: false,
      openMudarUsuario: false,
      direcao: "left",

      userAtual: null,
      openList: false,
      users: [],
      timeline: true,
      postsUser: false
    };
  }
  componentWillReceiveProps() {
    if (localStorage.getItem("loginUsuarioSession")) {
      this.setState({
        userAtual: JSON.parse(localStorage.getItem("loginUsuarioSession"))
      });
    }
  }
  async componentDidMount() {
    if (localStorage.getItem("loginUsuarioSession")) {
      this.setState({
        userAtual: JSON.parse(localStorage.getItem("loginUsuarioSession"))
      });
    }

    this.readUsersDataBase();
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  readUsersDataBase() {
    FirebaseService.getDataList("users", dataReceived =>
      this.setState({ users: dataReceived })
    );
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  render() {
    return (
      <div>
        <div>
          <AppBar>
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
              >
                <MenuIcon />
              </IconButton>

              <Avatar
                style={{
                  position: "absolute",
                  zIndex: 1,
                  top: 12,
                  right: 0,
                  margin: "auto"
                }}
                aria-label="Recipe"
                src={
                  this.state.userAtual
                    ? this.state.userAtual.imageUser
                    : "https://www.voipdobrasil.com.br/blog/images/usuario.png"
                }
              />
              <Typography variant="h6" color="inherit" noWrap>
                Rede Social
              </Typography>
            </Toolbar>

            {this.state.userAtual ? (
              <Fab
                onClick={() => this.props.history.push("/criar")}
                style={{
                  size: "small",
                  position: "absolute",
                  zIndex: 1,
                  top: "5%",
                  right: 50,
                  margin: "auto"
                }}
                color="secondary"
                aria-label="Add"
              >
                <AddIcon />
              </Fab>
            ) : (
              <div />
            )}
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
                <Avatar
                  aria-label="Recipe"
                  src={
                    this.state.userAtual
                      ? this.state.userAtual.imageUser
                      : "https://www.voipdobrasil.com.br/blog/images/usuario.png"
                  }
                />
              }
              title={this.state.nameUsuarioAtual}
            />
            <Divider />

            <List component="nav">
              <ListItem
                button
                onClick={() => {
                  this.props.history.push("/login");
                  this.handleDrawerClose();
                }}
              >
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText inset primary="Login" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  this.props.history.push("/UserPosts");
                  this.handleDrawerClose();
                }}
              >
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText inset primary="Ver Meus Posts" />
              </ListItem>

              {this.state.userAtual === undefined ? (
                <ListItem
                  button
                  onClick={() =>
                    this.props.history.push(
                      "/Posts/" + this.state.userAtual["key"]
                    )
                  }
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Meus Post" />
                </ListItem>
              ) : (
                <div />
              )}
            </List>
          </Drawer>
        </div>
      </div>
    );
  }
}

export default Header;
/*
        <PostCreator
          isLoading={this.state.loading}
          onCreate={this.saveInAPI.bind(this)}
          idAuthorAtual={this.state.idAuthorAtual}
        />*/
