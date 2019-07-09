import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import { localhost } from "../util/util";
import { setAuthToken } from "../util/AuthService";
import jwt_decode from "jwt-decode";

// export const registerUser = userData => {
//   return {
//     type: TEST_DISPATCH,
//     payload: userData
//   };
// };

export const clearError = () => {
    return {
        type: GET_ERRORS,
        payload : {}
    }
}
export const loginUser = (userData, role) => dispatch => {
  axios
    .post(`${localhost}/api/users/login-${role}`, userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      dispatch(clearError());
    })
    .catch(err => 
      { dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
    );
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    // Remove auth header for future request
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}


export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}