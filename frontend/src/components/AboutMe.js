import React, { Component } from "react";
import SkillBar from "react-skillbars";
import { Container, Row, Col } from "reactstrap";

const skills = [
  { type: "HTML/CSS", level: 90 },
  { type: "JS/Node", level: 85 },
  { type: "React", level: 80 },
  { type: "NoSQL", level: 80 },
  { type: "Python", level: 70 },
  { type: "C", level: 70 },
  { type: "PHP", level: 60 },
  { type: "SQL", level: 60 },
  { type: "VBA", level: 60 }
];
const skills2 = [
  { type: "Indonesia", level: 100 },
  { type: "English", level: 90 }
];

const colors = {
  bar: {
    hue: 264,
    saturation: 51,
    level: {
      minimum: 75,
      maximum: 90
    }
  },
  title: {
    text: "#fff",
    background: "rgba(89,49,150,1)"
  }
};
export class AboutMe extends Component {
  componentDidMount() {
    if (this.props.conditionActive !== false) this.props.changeTab();
  }
  render() {
    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: this.props.fitHeight,
            padding: "25px 10px",
            textAlign: "center"
          }}
        >
          <div style={{ padding: "25px 0", maxWidth: "400px", margin: "auto" }}>
            <img
              alt="profile"
              style={{
                marginBottom: "5px",
                borderRadius: "50%",
                maxWidth: "200px",
                maxHeight: "200px"
              }}
              src="../../images/profile.jpg"
            />
            <h2>M. Sandy Gunawan</h2>
            <div style={{ marginBottom: "5px" }}>
              <a href="mailto:sandyz.boyz@gmail.com">
                <i
                  style={{
                    marginRight: "3px",
                    color: "white",
                    backgroundColor: "#D44638",
                    padding: "8px"
                  }}
                  className="fas fa-lg fa-envelope"
                />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i
                  style={{
                    marginRight: "3px",
                    backgroundColor: "#0073b1",
                    color: "white",
                    padding: "8px",
                    minWidth: "34.68px"
                  }}
                  className="fab fa-lg fa-linkedin-in"
                />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i
                  style={{
                    color: "white",
                    backgroundColor: "#3b5998",
                    padding: "8px",
                    minWidth: "34.68px"
                  }}
                  className="fab fa-lg fa-facebook-f"
                />
              </a>
            </div>
            <p className="lead">
              I'm fresh graduate who enthusiastic learning programming
              especially about web technology and development
            </p>
          </div>
        </div>
        <Container>
          <Row>
            <Col lg="4" md="6">
              <div
                style={{
                  display: "flex",
                  padding: "10px 20px",
                  justifyContent: "center",
                  backgroundColor: "rgba(89,49,150,0.05)",
                  borderTop: "solid 4px rgba(89,49,150,0.65)",
                  minHeight: "250px"
                }}
              >
                <div>
                  <h4 style={{ marginBottom: "20px", textAlign: "center" }}>
                    Info
                  </h4>
                  <div style={{ display: "flex" }}>
                    <p style={{ fontWeight: "600", width: "70px" }}>Fullname</p>
                    <p>Muhammad Sandy Gunawan</p>
                  </div>
                  <div style={{ display: "flex" }}>
                    <p style={{ fontWeight: "600", width: "70px" }}>Birthday</p>
                    <p>March 15, 1996</p>
                  </div>
                  <div style={{ display: "flex" }}>
                    <p style={{ fontWeight: "600", width: "70px" }}>Address</p>
                    <p>Jl. Kalibaru Timur IV - Jakarta</p>
                  </div>
                  <div style={{ display: "flex" }}>
                    <p style={{ fontWeight: "600", width: "70px" }}>Email</p>
                    <p>sandyz.boyz@gmail.com</p>
                  </div>
                  <div style={{ display: "flex" }}>
                    <p style={{ fontWeight: "600", width: "70px" }}>Phone</p>
                    <p>(+62) 813 8316 7404</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg="4" md="6">
              <div
                style={{
                  padding: "10px 20px",
                  backgroundColor: "rgba(89,49,150,0.05)",
                  borderTop: "solid 4px rgba(89,49,150,0.65)",
                  minHeight: "250px"
                }}
              >
                <h4 style={{ marginBottom: "20px", textAlign: "center" }}>
                  Story
                </h4>
                <div>
                  <i style={{ lineHeight: "30px" }}>
                    "I start learn code with C programming language and after
                    that i also learn Python and Javascript, but i recently
                    stick with JS especially{" "}
                    <strong
                      style={{
                        padding: "3px 6px",
                        backgroundColor: "black",
                        color: "#61dafb"
                      }}
                    >
                      React
                    </strong>{" "}
                    and{" "}
                    <strong
                      style={{
                        padding: "3px 6px",
                        color: "white",
                        backgroundColor: "#026e00"
                      }}
                    >
                      NodeJS
                    </strong>{" "}
                    for my preferred fullstack technologies."
                  </i>
                </div>
              </div>
            </Col>
            <Col lg="4" md="12">
              <div
                style={{
                  padding: "10px 20px",
                  backgroundColor: "rgba(89,49,150,0.05)",
                  borderTop: "solid 4px rgba(89,49,150,0.65)",
                  minHeight: "250px"
                }}
              >
                <h4 style={{ marginBottom: "20px", textAlign: "center" }}>
                  Education
                </h4>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>
                    <i
                      style={{
                        color: "rgba(89,49,150,0.65)",
                        marginRight: "10px"
                      }}
                      className="fas fa-circle"
                    />
                    2014-2019
                  </div>
                  <div
                    style={{
                      display: "flex",
                      paddingLeft: "10px",
                      marginTop: "10px"
                    }}
                  >
                    <div style={{ marginRight: "10px" }}>
                      <img
                        style={{ width: "55px" }}
                        src="../../images/Logo_IPB.svg"
                        alt="logo-ipb"
                      />
                    </div>
                    <div>
                      <div>IPB University</div>
                      <div>Bachelor of Science, Physics</div>
                      <div>GPA 3.33</div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <div
                style={{
                  marginTop: "10px",
                  backgroundColor: "rgba(89,49,150,0.05)",
                  padding: "10px 20px",
                  borderTop: "solid 4px rgba(89,49,150,0.65)"
                }}
              >
                <h4 style={{ textAlign: "center", marginBottom: "20px" }}>
                  Skill & Competency
                </h4>
                <SkillBar
                  skills={skills}
                  colors={colors}
                  animationDelay={500}
                  height={20}
                  animationDuration={2000}
                />
              </div>
            </Col>
            <Col lg="6">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "stretch",
                  height: "100%",
                  marginTop: "10px",
                  backgroundColor: "rgba(89,49,150,0.05)",
                  borderTop: "solid 4px rgba(89,49,150,0.65)",
                  padding: "10px 20px"
                }}
              >
                <h4 style={{ textAlign: "center", marginBottom: "20px" }}>
                  Language
                </h4>
                <SkillBar
                  skills={skills2}
                  colors={colors}
                  animationDelay={500}
                  height={20}
                  animationDuration={2000}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default AboutMe;
