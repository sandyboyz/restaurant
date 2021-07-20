import React, { Component } from "react";
import PropTypes from "prop-types";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import "./LoginGoogle.css";

class Login extends Component {
  state = {
    role: "Admin",
    workerID: "",
    password: ""
  };
  changeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.role !== this.state.role) {
      this.setState(
        {
          password: "",
          workerID: ""
        },
        () => this.props.clearError()
      );
    }
  }
  googleResponse = response => {
    this.props.loginGoogle(response);
  };

  facebookResponse = response => {
    console.log(response);
    this.props.loginFacebook(response);
  };

  onFailure = error => {
    console.log(error);
  };

  handlerSubmit = e => {
    e.preventDefault();
    const role = this.state.role.toLowerCase();
    let userData = {
      password: this.state.password
    };
    if (role === "worker") {
      userData = {
        ...userData,
        workerID: this.state.workerID
      };
    }
    this.props.loginUser(userData, role);
  };
  render() {
    let workerInput = null;
    let submitCondition = false;
    switch (this.state.role) {
      case "Admin":
        submitCondition = this.state.password.length > 0;
        break;
      case "Worker":
        submitCondition =
          this.state.workerID.length > 0 && this.state.password.length > 0;
        break;
      default:
    }

    if (this.state.role === "Worker")
      workerInput = (
        <div className="form-group">
          <label htmlFor="worker">Worker ID</label>
          <input
            onChange={this.changeInput}
            value={this.state.workerID}
            placeholder="Input ID"
            id="worker"
            type="text"
            name="workerID"
            className="form-control"
          />
        </div>
      );
    return (
      <div className={classes["container"]}>
        <div className={classes["login-box"]}>
          <div className={classes["wrapper"]}>
            <div
              style={{
                position: "absolute",
                top: "2%",
                left: "2%",
                fontWeight: 800
              }}
            >
              <Link to="/">
                <i
                  style={{ fontSize: "20px", marginRight: "5px" }}
                  className="fas fa-reply"
                />
                Back To Home
              </Link>
            </div>
            <h3>Login System</h3>

            <form onSubmit={this.handlerSubmit}>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={this.state.role}
                  onChange={this.changeInput}
                  className="form-control"
                >
                  <option value="Admin">Admin</option>
                  <option value="Worker">Worker</option>
                </select>
              </div>
              {workerInput}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  onChange={this.changeInput}
                  value={this.state.password}
                  placeholder="Input password"
                  id="password"
                  type="password"
                  name="password"
                  className="form-control"
                />
              </div>
              {this.props.errors.msg && (
                <p style={{ color: "red", fontWeight: 600 }}>Auth Failed</p>
              )}
              <button
                disabled={!submitCondition}
                style={{ marginTop: "10px", width: "100%", height: "40px" }}
                className="btn btn-primary"
                type="submit"
              >
                Login
              </button>
              <GoogleLogin
                render={renderProps => (
                  <button
                    className="google-button"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <span className="google-button__icon">
                      <svg
                        viewBox="0 0 366 372"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z"
                          id="Shape"
                          fill="#EA4335"
                        />
                        <path
                          d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z"
                          id="Shape"
                          fill="#FBBC05"
                        />
                        <path
                          d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z"
                          id="Shape"
                          fill="#4285F4"
                        />
                        <path
                          d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z"
                          fill="#34A853"
                        />
                      </svg>
                    </span>
                    <span className="google-button__text">
                      Sign in with Google
                    </span>
                  </button>
                )}
                onSuccess={this.googleResponse}
                onFailure={this.onFailure}
                clientId="123158523971-j8e7h4g9jhnm2ofaf3o0qg7acb489irc.apps.googleusercontent.com"
              />
              <FacebookLogin
                appId="2464968617055403"
                fields="name,email,picture"
                callback={this.facebookResponse}
                onFailure={(err) => console.log(err)}
                render={renderProps => {
                  return (<button
                    className="google-button"
                    style={{
                      backgroundColor: "#4267b2",
                      color: "white",
                      fontSize: "14px",
                      fontWeight: 600
                    }}
                  type="button"
                  onClick={renderProps.onClick}>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path fill="#fff" d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    </span>
                    <span className="google-button__text">
                      Sign in with Facebook
                    </span>
                  </button>
                  )}}
              />
            </form>
          </div>
          <div
            className={classes["info-admin"]}
            style={{
              position: "absolute",
              bottom: 5,
              borderRadius: "5px",
              padding: "10px",
              border: "solid 3px rgba(89,49,150,0.1)"
            }}
          >
            {" "}
            <div style={{ display: "flex" }}>
              <strong style={{ minWidth: "75px" }}>Role</strong>admin
            </div>
            <div style={{ display: "flex" }}>
              <strong style={{ minWidth: "75px" }}>Password</strong> admin
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default Login;
