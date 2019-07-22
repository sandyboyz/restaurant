import React, { Component } from "react";
import classes from "./Cover.module.css";
import { Jumbotron, Button } from "reactstrap";
import { Link } from "react-router-dom";

class Cover extends Component {
  render() {
    return (
      <div className={classes["main-container"]}>
        {this.props.children}
        <Jumbotron className={classes["jumbotron"]}>
          <h4>RESTaurant</h4>
          <h5>
            Taste of <span>Indonesia</span> Culinary
          </h5>
          <h1>Love Food? Try It Here!</h1>
          <p className="lead">
            We serve Indonesia traditional food with high quality of exotic
            spices and herbs
          </p>
          <Link to="/food">
            <Button
              style={{
                fontSize: ".6em",
                width: "auto",
                padding: ".5em 2em"
              }}
              className={classes["button"]}
              color="primary"
            >
              Eat Now
            </Button>
          </Link>
        </Jumbotron>
      </div>
    );
  }
}

export default Cover;
