import axios from "axios";
import React from 'react';
import {Redirect, Route} from 'react-router-dom';


export const localhost = "http://192.168.88.7:5000";

export const fetchMainCourses = (activePage, limit) => {
  return axios.get(
    `${localhost}/api/mainfood?page=${activePage}&limit=${limit}`
  );
};

export const Auth = {
  authenticate() {
    const auth = localStorage.getItem("authenticate")
    if (auth === "1") return true;
    else return false;
  }
};

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.authenticate() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      )
    }
  />
);
