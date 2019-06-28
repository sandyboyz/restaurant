import React, { Component } from "react";
import { Jumbotron, Button } from "reactstrap";

class Cover2 extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundImage: "url(images/cover2.jpg)",
          backgroundSize: "cover"
        }}
        className="main-container"
      >
        {this.props.children}
        <Jumbotron
          style={{
            height: "100%",
            flexGrow: 1,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: "transparent"
          }}
        >
          <div
            style={{
              marginBottom: "2rem",
              fontFamily: "Kalam"
            }}
          >
            <h1
              style={{
                letterSpacing: "0.5rem"
              }}
            >
              R
              <span>
                <img
                  src="/images/231901263.png"
                  alt="gambar"
                  style={{
                    height: "1.55rem",
                    position: "relative",
                    margin: "0 0.3125rem 0.75rem 0"
                  }}
                />
              </span>
              STaurant
            </h1>
            <p style={{ fontSize: "1.3rem", fontWeight: "300" }}>
              Tastes of{" "}
              <span
                style={{
                  fontWeight: "700",
                  background: "linear-gradient(to bottom, #F00 0%, #000 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Indonesia
              </span>{" "}
              Culinary
            </p>
          </div>

          <div className="main-heading">
            <h1>Love Food? Try It Here!</h1>
            <p className="lead">
              We serve Indonesia traditional food with high quality of exotic
              spices and herbs
            </p>
            <hr className="my-2" />
            <p>
              We guaranteed cooking service to highest level with our chef had
              many high level experience in the cooking field
            </p>
            <p className="lead">
              <Button color="primary" style={{ width: "10rem" }}>
                Eat Now
                <br />
              </Button>
            </p>
          </div>
          <div>
            <img
              className="arrowbounce"
              src="images/arrowdown.svg"
              alt="icon"
            />
          </div>
        </Jumbotron>
      </div>
    );
  }
}

export default Cover2;
