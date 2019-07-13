import React, { Component } from "react";
import { isMobile } from "react-device-detect";
import { localhost } from "../util/util";
import axios from "axios";
import classes from "./Dashboard_Food.module.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

export class Dashboard_Food extends Component {
  state = {
    input: {
      foodname: "",
      price: ""
    },
    file: null,
    fileblob: null,
    read: {
      food: [],
      filter: ""
    },
    price: {
      min: 0,
      max: 500000
    }
  };

  componentDidMount() {
    axios
      .get(`${localhost}/api/mainfood?limit=25`)
      .then(res => {
        const food = [...res.data.docs];
        const read = { ...this.state.read, food };
        this.setState({ read });
      })
      .catch(err => console.log(err));
  }
  onChangeImage = event => {
    let [file] = event.target.files;
    this.setState({ fileblob: URL.createObjectURL(file), file });
  };
  onChangeInput = event => {
    const input = {
      ...this.state.input,
      [event.target.name]: event.target.value
    };
    this.setState({ input });
  };
  onSubmitFood = event => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("productImage", this.state.file);
    formData.append("name", this.state.input.foodname);
    formData.append("price", this.state.input.price);
    axios
      .post(`${localhost}/api/mainfood`, formData)
      .then(res => {
        this.setState({
          input: {
            foodname: "",
            price: ""
          },
          file: null,
          fileblob: null
        });
        console.log(res);
      })
      .catch(err => console.log(err));
  };
  onChangeFilter = event => {
    const filter = event.target.value;
    const read = {
      ...this.state.read,
      filter
    };

    this.setState({ read }, () =>
      axios
        .get(
          `${localhost}/api/mainfood?liveSearch=${
            this.state.read.filter
          }&limit=100&priceMin=${this.state.price.min}&priceMax=${
            this.state.price.max
          }`
        )
        .then(res => {
          const read = {
            ...this.state.read,
            food: res.data.docs
          };
          this.setState({ read });
        })
        .catch(err => console.log(err))
    );
  };

  priceSlider = value => {
    const [min, max] = value;
    this.setState(
      {
        price: {
          ...this.state.price,
          min,
          max
        }
      },
      () => {
        axios
          .get(
            `${localhost}/api/mainfood/?liveSearch=${
              this.state.read.filter
            }&priceMin=${this.state.price.min}&priceMax=${
              this.state.price.max
            }&limit=100`
          )
          .then(res => {
            this.setState({
              read: {
                ...this.state.read,
                food: res.data.docs
              }
            });
          })
          .catch(err => console.log(err));
      }
    );
  };
  render() {
    let foodList = (
      <tr>
        <td />
        <td />
      </tr>
    );
    if (this.state.read.food.length > 0) {
      foodList = this.state.read.food.map(val => {
        return (
          <tr key={val._id}>
            <td>
              <div className={classes["foodcontainer"]}>
                <img src={`${localhost}/${val.picture}`} alt={val.name} />
                <div>
                  <strong>{val.name}</strong>
                  <br />
                  {val.price}
                </div>
              </div>
            </td>
            <td>
              <i style={{ color: "green" }} className="fas fa-edit fa-lg" />{" "}
              <i style={{ color: "red" }} className="fas fa-user-slash fa-lg" />
            </td>
          </tr>
        );
      });
    }
    return (
      <React.Fragment>
        <div
          style={{
            width:
              this.props.show && isMobile && window.innerWidth < 361
                ? "75%"
                : "100%",
            padding: "10px 5px"
          }}
        >
          <h2>Food List</h2>
          <hr />
          <h6>Filter by name</h6>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <input
              value={this.state.read.filter}
              onChange={this.onChangeFilter}
              style={{ maxWidth: "200px" }}
              className="form-control"
              type="text"
            />
            <button className="btn btn-info">Clear</button>
          </div>
          <br />
          <div style={{ maxWidth: 280 }}>
            <h6>Filter by Price</h6>
            <Range
              step={1000}
              min={0}
              max={500000}
              value={[this.state.price.min, this.state.price.max]}
              onChange={this.priceSlider}
              tipFormatter={value => `${value.toLocaleString()}`}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>{this.state.price.min.toLocaleString()}</p>
              <p>{this.state.price.max.toLocaleString()}</p>
            </div>
          </div>
          <br />
          <div>
            <table className="table table-bordered table-striped">
              <thead className="bg-primary text-light">
                <tr>
                  <td>
                    Name
                    <br />
                    Price
                  </td>
                  <td>Edit/Delete</td>
                </tr>
              </thead>
              <tbody>{foodList}</tbody>
            </table>
          </div>
          <h2>Add Food</h2>
          <hr />
          <form onSubmit={this.onSubmitFood}>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div style={{ flexGrow: 1, padding: "10px 20px" }}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    name="foodname"
                    value={this.state.input.foodname}
                    onChange={this.onChangeInput}
                    className="form-control"
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    name="price"
                    value={this.state.input.price}
                    onChange={this.onChangeInput}
                    className="form-control"
                    type="number"
                  />
                </div>
              </div>
              <div
                style={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px 20px"
                }}
              >
                <label>Upload Image</label>
                {this.state.fileblob !== null ? (
                  <img
                    src={this.state.fileblob}
                    style={{ width: "100%" }}
                    alt="food"
                  />
                ) : (
                  <div
                    style={{
                      backgroundColor: "lightgray",
                      width: "100%",
                      height: "15em",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center"
                    }}
                  >
                    <span
                      style={{
                        color: "grey",
                        fontSize: "2em",
                        letterSpacing: "3px",
                        fontWeight: 400
                      }}
                    >
                      PREVIEW IMAGE
                    </span>
                  </div>
                )}

                <br />
                <div className="form-group">
                  <input
                    onChange={this.onChangeImage}
                    className="form-control-file"
                    type="file"
                    accept="image/*"
                  />
                </div>
              </div>
            </div>
            <div style={{ padding: "10px 20px" }}>
              <button
                style={{ width: "100%" }}
                className="btn btn-primary"
                type="submit"
              >
                Add Food
              </button>
            </div>
          </form>
        </div>
        {/* <div
          style={{
            position: "fixed",
            zIndex: 200,
            width: "90%",
            height: "90%",
            transform: "translate(-50%,-50%)",
            backgroundColor: "lightgreen",
            left: "50%",
            top: "50%"
          }}
        >
          Wawo Saguo
        </div> */}
      </React.Fragment>
    );
  }
}

export default Dashboard_Food;
