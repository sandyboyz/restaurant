import React, { Component } from "react";
import classes from "./AboutHome.module.css";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import AboutMe from "./AboutMe";
import AboutProject from "./AboutProject";

const { container, active, item } = classes;

export class AboutHome extends Component {
  miniMenuRef = React.createRef();
  state = {
    conditionActive: false,
    fitHeight: 0
  };
  componentDidMount() {
    const miniMenuHeight = this.miniMenuRef.current.offsetHeight;
    const navHeight = this.props.navRefProvide.current.offsetHeight;
    this.setState({
      fitHeight: window.innerHeight - miniMenuHeight - navHeight
    });
  }
  changeTab = () => {
    this.setState({
      conditionActive: !this.state.conditionActive
    });
  };
  render() {
    return (
      <React.Fragment>
        <div ref={this.miniMenuRef} className={`${container}`}>
          <Link
            to="/about/me"
            onClick={() => {
              if (this.state.conditionActive) {
                this.changeTab();
              }
            }}
            className={`${item} ${!this.state.conditionActive ? active : ""}`}
          >
            Me
          </Link>
          <Link
            to="/about/project"
            onClick={() => {
              if (!this.state.conditionActive) {
                this.changeTab();
              }
            }}
            className={`${item} ${this.state.conditionActive ? active : ""}`}
          >
            This Project
          </Link>
        </div>
        <Switch>
          <Route
            path="/about/me"
            exact
            render={props => (
              <AboutMe
                {...props}
                fitHeight={this.state.fitHeight}
                conditionActive={this.state.conditionActive}
                changeTab={this.changeTab}
              />
            )}
          />
          <Route
            path="/about/me/*"
            render={() => <Redirect to="/about/me" />}
          />
          <Route
            path="/about/project"
            exact
            render={props => (
              <AboutProject
                {...props}
                conditionActive={this.state.conditionActive}
                changeTab={this.changeTab}
              />
            )}
          />
          <Route
            path="/about/project/*"
            render={() => <Redirect to="/about/project" />}
          />
          <Route
            path="/about"
            exact
            render={() => <Redirect to="/about/me" />}
          />
          <Route path="/about/*" render={() => <Redirect to="/about/me" />} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default AboutHome;
