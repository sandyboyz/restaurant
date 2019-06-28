import React, { Component } from "react";
// import ioClient from 'socket.io-client';

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./page/Home";
import Food from "./page/Food";
import Login from "./page/Login";
import Page404 from "./page/Page404";




import Dashboard from "./components/Dashboard";
import { PrivateRoute } from "./util/util";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/food" component={Food} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/admin" component={Dashboard}/>
          <Route component={Page404} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
