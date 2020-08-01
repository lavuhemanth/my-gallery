import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "./components/login";
import Register from "./components/register";
import Main from "./components/main";
import NotFound from "./components/notFound";
import ProtectedRoute from "./common/protectedRout";

class App extends Component {
  state = {
    isAuth: false,
  };

  render() {
    return (
      <>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Register} />
          <Route path="/not-found" component={NotFound} />
          <ProtectedRoute exact path="/home" component={Main} />
          <Redirect from="/" to="/login" />
          <Redirect to="/not-found" />
        </Switch>
      </>
    );
  }
}

export default App;
