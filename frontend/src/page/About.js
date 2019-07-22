import React, { Component } from "react";
import NavigationBar from "../components/NavigationBar";
import AboutHome from "../components/AboutHome";

export class About extends Component {
  navRef = React.createRef();

  render() {
    return (
      <React.Fragment>
        <NavigationBar refKey={this.navRef} />
        <AboutHome navRefProvide={this.navRef} />
      </React.Fragment>
    );
  }
}

export default About;
