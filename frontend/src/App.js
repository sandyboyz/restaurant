import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "./util/AuthService";
import { setCurrentUser } from "./actions/authAction";

// import ioClient from 'socket.io-client';

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./page/Home";
import Food from "./page/Food";
import Login from "./page/Login";
import Dashboard from "./page/Dashboard";
import Page404 from "./page/Page404";

import PrivateRoute from "./util/util";
import { Provider } from "react-redux";
import store from "./store";
import About from "./page/About";
import { ToastContainer, Zoom } from "react-toastify";

if (localStorage.jwtToken) {
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
            <Route path="/login/*" render={() => <Redirect to="/login" />} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Route path="/about" component={About} />
            <Route component={Page404} />
          </Switch>
        </BrowserRouter>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          pauseOnFocusLoss={false} 
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnVisibilityChange={false}
          draggable
          pauseOnHover={false}
          transition={Zoom}
          draggablePercent={40}


        />
      </Provider>
    );
  }
}

export default App;
