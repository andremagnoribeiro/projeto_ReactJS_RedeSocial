import React, { Component } from "react";
import FirebaseService from "../firebaseService";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Header from "./header";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
      users: null
    };
  }

  componentDidMount() {
    this.readUsersDataBase();
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  readUsersDataBase() {
    FirebaseService.getDataList("users", dataReceived => {
      this.setState({ users: dataReceived });
      console.log("usariaos:");
      console.table(this.state.users);
    });
  }
  async confereUserPassord(name, password) {
    this.state.users.map(user => {
      console.log("usario logado:", user.name, user.password);
      console.log("usario logado:", name, password);
      if (user.password == password && user.name == name) {
        localStorage.setItem("loginUsuarioSession", JSON.stringify(user));
        console.log("usario logado:", user.name, user.password);
        this.props.history.push("/");
      }
    });
  }
  render() {
    return (
      <div style={{ marginTop: 63, marginLeft: 5, marginRight: 5 }}>
        <h1>Login</h1>
        <img
          style={{ marginTop: 100, marginLeft: "35%" }}
          src="https://www.voipdobrasil.com.br/blog/images/usuario.png"
        />
        <TextField
          style={{ width: "100%", marginTop: 25 }}
          id="standard-name"
          label="Name"
          value={this.state.name}
          onChange={this.handleChange("name")}
          margin="normal"
        />
        <TextField
          style={{ width: "100%" }}
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          margin="normal"
          onChange={this.handleChange("password")}
        />{" "}
        <Button
          style={{ width: "100%", margin: 20 }}
          variant="contained"
          size="small"
          color="primary"
          onClick={() =>
            this.confereUserPassord(this.state.name, this.state.password)
          }
        >
          > Login
        </Button>
        <div style={{ margin: 10 }}>
          <Button onClick={() => this.props.history.push("/cadastroUser")}>
            cadastre-se
          </Button>
        </div>
        <Button style={{ margin: 10 }}>esqueci minha senha</Button>
      </div>
    );
  }
}
export default Login;
