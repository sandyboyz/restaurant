import axios from "axios";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";

export let localhost;

if(process.env.NODE_ENV === "production"){
  localhost = "https://sandy-restaurant.herokuapp.com";
} else {
  localhost = "http://192.168.88.250:5000";
}

export const fetchMainCourses = (activePage, limit) => {
  return axios.get(
    `${localhost}/api/mainfood?page=${activePage}&limit=${limit}`
  );
};

export const filterQueryString = function(words, value, init = false) {
  const query = queryString.parse(this.props.location.search);
  let string = "";
  for (let key in query) {
    if (key !== words && key !== "") {
      string += `${key}=${query[key]}&`;
    }
  }
  if (!init) {
    string += `${words}=${value}`;
    return string;
  }
  else {
    string = string.substring(0, string.length-1);
    return string;
  }
};

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
