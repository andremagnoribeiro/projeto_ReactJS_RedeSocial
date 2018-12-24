import React, { Component } from "react";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Select from "react-select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import ReactDOM from "react-dom";
import NativeSelect from "@material-ui/core/NativeSelect";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import FirebaseService from "../firebaseService";
import { ToastContainer, toast } from "react-toastify";
import { storage } from "../firebase";
//pedido kabum 11555596
class PostCreator extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      titulo: "",
      users: [],
      user: {},
      userAtual: null,
      loading: false,
      url: "",
      progress: 0
    };
  }

  componentDidMount() {
    if (localStorage.getItem("loginUsuarioSession")) {
      this.setState({
        userAtual: JSON.parse(localStorage.getItem("loginUsuarioSession"))
      });
    }
    //pegar informação da url
    /*FirebaseService.getData(
      this.props.match.params.idUser,
      "author",
      dataReceived => {
        this.setState({ user: dataReceived });
        console.log("tttttttttttttttttt", this.state.user.name);
      }
    );
*/
  }
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

  createPost() {
    //idUser=this.props.match.params.idUser;
    this.setState({ loading: true });

    const newPost = {
      title: this.state.titulo,
      author: this.state.userAtual["key"],
      image: this.state.url,
      date:
        " " +
        new Date().getDate() +
        " de " +
        new Date().getMonth() +
        " - " +
        new Date().getHours() +
        "H" +
        new Date().getMinutes(),
      text: this.state.text,
      likes: 0
    };
    //this.savePost(newPost);
    FirebaseService.writeNewPost(newPost);
    this.setState({ loading: false });
    this.props.history.push("/");
  }
  savePost(post) {
    axios.post("http://localhost:3001/posts", post).then(response => {
      this.setState({ loading: false });
    });
    this.setState({ loading: false });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    console.table(this.state.users);
    return (
      <div style={{ padding: 15 }}>
        <div style={{ padding: 15, textAlign: "center" }}>
          <h1 style={{ display: "flex" }}>Crie seu Post</h1>
        </div>

        <TextField
          defaultValue="Default Value"
          multiline
          id="filled-multiline-static"
          label="Titulo"
          rows="2"
          onChange={event => {
            const value = event.target.value;
            this.setState({ titulo: value });
          }}
          value={this.state.titulo}
          style={{ width: "100%" }}
        />
        <input type="file" onChange={this.fileChangedHandler} />
        <div>
          <progress value={this.state.progress} max="100" />
        </div>
        <TextField
          defaultValue="Default Value"
          multiline
          id="filled-multiline-static"
          label="Texto"
          rows="5"
          onChange={event => {
            const value = event.target.value;
            this.setState({ text: value });
          }}
          value={this.state.text}
          style={{ width: "100%" }}
        />

        {this.state.text != "" &&
        this.state.titulo != "" &&
        this.state.url != "" ? (
          <Button
            style={{ margin: 20 }}
            onClick={() => this.createPost()}
            variant="contained"
            color="primary"
          >
            {" "}
            save
            {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
            <SaveIcon />
          </Button>
        ) : (
          <Button
            style={{ margin: 20 }}
            variant="contained"
            size="small"
            color="white"
          >
            save
            {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
            <SaveIcon />
          </Button>
        )}
      </div>
    );
  }
}

export default PostCreator;
/* <TextField
          id="standard-name"
          label="Imagem(URL)"
          value={this.state.image}
          onChange={this.handleChange("name")}
          margin="normal"
          onChange={event => {
            const value = event.target.value;
            this.setState({ image: value });
          }}
          value={this.state.image}
          style={{ width: "100%" }}
        />
        {this.state.image != "" ? (
          <CardMedia
            style={{ height: 0, paddingTop: "56.25%" }}
            image={this.state.image}
            title="Paella dish"
          />
        ) : (
          <h3>Coloque uma URL</h3>
        )}*/
