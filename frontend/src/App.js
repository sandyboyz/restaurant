import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import {setAuthToken} from './util/AuthService';
import {setCurrentUser} from './actions/authAction';

// import ioClient from 'socket.io-client';

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./page/Home";
import Food from "./page/Food";
import Login from "./page/Login";
import Dashboard from "./page/Dashboard";
import Page404 from "./page/Page404";





import PrivateRoute  from "./util/util";
import { Provider } from "react-redux";
import store from "./store";


if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}> 
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/food" component={Food} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/dashboard" component={Dashboard}/>
          <Route component={Page404} />
        </Switch>
      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
