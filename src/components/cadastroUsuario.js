import React, { Component } from "react";
import FirebaseService from "../firebaseService";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ImageUploader from "react-images-upload";
import { storage } from "../firebase";
import { CircularProgress } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
const Greet = ({ name }) => <div>Hello {name}</div>;

class CadastroUser extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      selectedFile: null,
      progress: 0,
      url: "",
      loading: false
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  fileChangedHandler = event => {
    const image = event.target.files[0];
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progrss function ....
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        // error function ....
        console.log(error);
      },
      () => {
        // complete function ....
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url1 => {
            console.log(url1);
            this.setState({ url: url1 });
          });
      }
    );
  };

  async saveUserDataBase() {
    this.setState({ loading: true });
    toast(<Greet name="John" />);
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      imageUser: this.state.url
    };

    FirebaseService.writeNewUser(newUser);
    this.setState({ loading: false });
    this.props.history.push("/login");
  }

  render() {
    return (
      <div style={{ marginTop: 63, textAlign: "center" }}>
        <h1>Informe seus Dados:</h1>
        <div
          style={{
            height: 100,
            marginLeft: 20,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <img
            style={{
              flex: 1,
              height: 100,

              alignItems: "stretch",
              justifyContent: "center"
            }}
            src={this.state.url}
          />
        </div>
        <div>
          <progress value={this.state.progress} max="100" />
        </div>
        <input type="file" onChange={this.fileChangedHandler} />
        <TextField
          style={{ width: "100%", marginTop: 25 }}
          id="standard-name"
          label="Name"
          value={this.state.name}
          onChange={this.handleChange("name")}
          margin="normal"
        />
        <TextField
          style={{ width: "100%", marginTop: 25 }}
          id="standard-name"
          label="Email"
          value={this.state.email}
          onChange={this.handleChange("email")}
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
        />
        <TextField
          style={{ width: "100%" }}
          id="standard-password-input"
          label={
            this.state.password !== this.state.password2 ? (
              <div>
                Confirmade password ->{" "}
                <a style={{ color: "red" }}>Senhas não conferem</a>
              </div>
            ) : (
              "Confirmade password"
            )
          }
          type="password"
          autoComplete="current-password"
          margin="normal"
          onChange={this.handleChange("password2")}
        />

        {this.state.name != "" &&
        this.state.email != "" &&
        this.state.url != "" &&
        this.state.password === this.state.password2 ? (
          <Button
            style={{ width: "100%", margin: 20 }}
            variant="contained"
            size="small"
            color="primary"
            onClick={() => this.saveUserDataBase()}
          >
            Cadastrar
          </Button>
        ) : (
          <Button
            style={{ width: "100%", margin: 20 }}
            variant="contained"
            size="small"
            color="white"
          >
            {" "}
            Cadastrar
          </Button>
        )}
        {this.state.loading ? <CircularProgress /> : undefined}
      </div>
    );
  }
}
export default CadastroUser;
