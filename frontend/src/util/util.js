import axios from "axios";
import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import { connect } from "react-redux";


export const localhost = "http://192.168.88.250:5000";

export const fetchMainCourses = (activePage, limit) => {
  return axios.get(
    `${localhost}/api/mainfood?page=${activePage}&limit=${limit}`
  );
};


const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route {...rest} render={(props) => (
    auth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
