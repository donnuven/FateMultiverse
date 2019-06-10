import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.0.0";
import "assets/demo/demo.css";

import LandingPage from "views/examples/LandingPage.jsx";
import RegisterPage from "views/examples/RegisterPage.jsx";
import FateUserPage from "views/examples/FateUserPage.jsx";
import LoginPage from "views/examples/LoginPage.jsx";
import FateServantCreation from "views/examples/FateServantCreation.jsx";
import FateServantUpdate from "views/examples/FateServantUpdate.jsx";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route
        path="/landing-page"
        render={props => <LandingPage {...props} />}
      />
      <Route path="/login" render={props => <LoginPage {...props} />} />
      <Route path="/register" render={props => <RegisterPage {...props} />} />
      <Route
        path="/fateuserpage"
        render={props => <FateUserPage {...props} />}
      />
      <Route
        path="/fateservant"
        render={props => <FateServantCreation {...props} />}
      />
      <Route
        path="/EditFateServants"
        render={props => <FateServantUpdate {...props} />}
      />

      <Redirect from="/" to="/login" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
