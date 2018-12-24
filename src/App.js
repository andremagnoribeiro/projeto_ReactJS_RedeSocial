import React, { Component } from "react";
import { Switch, Route, BrowserRouter, Router } from "react-router-dom";

import PostDetails from "./components/postDetails";
import PostCreator from "./components/postCreator";
import Header from "./components/header";
import PostsUser from "./components/postsUser";
import Timeline from "./components/timeline";
import Login from "./components/login";
import CadastroUser from "./components/cadastroUsuario";

class App extends Component {
  showNotFound() {
    return <div>Página não encontrada :(</div>;
  }

  aboutPage() {
    const page = (
      <div>
        <h1>Sobre esse sistema</h1>
        <h3>Sou feito em REACT!</h3>
      </div>
    );
    return page;
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <>
            <Route path="/" component={Header} />
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/cadastroUser" component={CadastroUser} />
              <Route path="/post/:id" component={PostDetails} />
              <Route path="/UserPosts/" component={PostsUser} />
              <Route path="/sobre" component={this.aboutPage} />
              <Route path="/criar" component={PostCreator} />
              <Route exact path="/" component={Timeline} />
              <Route path="*" component={this.showNotFound} />
            </Switch>
          </>
        </BrowserRouter>
      </div>
    );
  }
}
/*
 */
export default App;

//<Route exact path="/time" component={Timeline} />
