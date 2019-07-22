import React, { Component } from "react";
import "./AboutProject.css";

export class AboutProject extends Component {
  componentDidMount() {
    if (this.props.conditionActive !== true) this.props.changeTab();
  }
  render() {
    return (
      <div>
        <div className="browser-window">
          <div className="top-bar">
            <div className="circles">
              <div
                className="circle"
                style={{ backgroundColor: "#ED594A", marginRight: "2px" }}
              />
              <div
                className="circle"
                style={{ backgroundColor: "#FDD800", marginRight: "2px" }}
              />
              <div className="circle" style={{ backgroundColor: "#5AC05A" }} />
            </div>
          </div>
          <div className="content">
            <div>
              <h4
                style={{
                  fontSize: "1em",
                  textAlign:"center"
                }}
              >
                RESTaurant
              </h4>
              <h5
                style={{
                  fontSize: "0.5em",
                  fontWeight: 300,
                  padding: "0 20px",
                  textAlign:"center"
                }}
              >
                Sample <i>React SPA (Single Page Application)</i> and{" "}
                <i>Node RESTful Server</i> that I used to practice my skills and
                concept based on self taught
              </h5>
              <hr style={{width:"90%"}}/>
              <h5
                style={{
                  fontSize: "0.35em",
                  fontWeight: 300,
                  padding: "0 20px",
                  textAlign:"center"
                }}
              >
                This application implement concept of SPA, REST, CRUD, and Auth 
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutProject;
