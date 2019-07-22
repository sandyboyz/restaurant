import React, { Component } from "react";
import Cover from "../components/Cover";
import NavigationBar from "../components/NavigationBar";

class Home extends Component {
  componentDidMount() {
    document.title = `SPA React-Node | ${document.title}`;
  }
  render() {
    return (
      <Cover>
        <NavigationBar transparent />
      </Cover>
    );
  }
}

export default Home;
