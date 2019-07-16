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
    },
    showEditMenu: false,
    showDeleteMenu: false,
    currentEdit: {
      _id: "",
      name: "",
      price: "",
      picture: "",
      file: null,
      fileblob: null
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
    if (file !== undefined) {
      this.setState({ fileblob: URL.createObjectURL(file), file });
    } else {
      this.setState({ file: null, fileblob: null });
    }
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
        axios.get(`${localhost}/api/mainfood?limit=25`).then(res => {
          this.setState({
            input: {
              foodname: "",
              price: ""
            },
            file: null,
            fileblob: null,
            read:{
              ...this.state.read,
              food: res.data.docs
            }
          });
        }).catch(err => console.log(err))
        
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
  deleteFoodOnClick = id => {
    axios
      .get(`${localhost}/api/mainfood/${id}`)
      .then(res => {
        const { _id } = res.data;
        this.setState({
          showDeleteMenu: true,
          currentEdit: {
            ...this.state.currentEdit,
            _id
          }
        });
      })
      .catch(err => console.log(err));
  };
  deleteFoodConfirm = id => {
    axios
      .delete(`${localhost}/api/mainfood/${id}`)
      .then(msg => {
        axios
          .get(`${localhost}/api/mainfood?limit=25`)
          .then(res => {
            this.setState({
              showDeleteMenu: false,
              read: {
                ...this.state.read,
                food: res.data.docs
              }
            });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };
  deleteFoodCancel = () => {
    this.setState({
      showDeleteMenu: false
    });
  };
  editFoodOnClick = id => {
    axios
      .get(`${localhost}/api/mainfood/${id}`)
      .then(res => {
        const { _id, name, price, picture } = res.data;
        this.setState({
          showEditMenu: true,
          currentEdit: {
            ...this.state.currentEdit,
            _id,
            name,
            price,
            picture
          }
        });
      })
      .catch(err => console.log(err));
  };
  onChangeInputEdit = event => {
    this.setState({
      currentEdit: {
        ...this.state.currentEdit,
        [event.target.name]: event.target.value
      }
    });
  };
  onChangeFile = event => {
    const [file] = event.target.files;
    console.log(file);
    if (file !== undefined) {
      this.setState({
        currentEdit: {
          ...this.state.currentEdit,
          file,
          fileblob: URL.createObjectURL(file)
        }
      });
    } else {
      this.setState({
        currentEdit: {
          ...this.state.currentEdit,
          file: null,
          fileblob: null
        }
      });
    }
  };
  onCancelEdit = () => {
    this.setState({
      showEditMenu: false,
      currentEdit: {
        ...this.state.currentEdit,
        file: null,
        fileblob: null
      }
    });
  };
  onSaveEdit = () => {
    let formData = new FormData();
    formData.append("name", this.state.currentEdit.name);
    formData.append("price", this.state.currentEdit.price);
    if (
      this.state.currentEdit.file !== undefined ||
      this.state.currentEdit.file !== null
    )
      formData.append("productImage", this.state.currentEdit.file);
    axios
      .put(`${localhost}/api/mainfood/${this.state.currentEdit._id}`, formData)
      .then(res => {
        axios
          .get(`${localhost}/api/mainfood?limit=25`)
          .then(res => {
            this.setState({
              read: {
                ...this.state.read,
                food: res.data.docs
              },
              showEditMenu: false,
              currentEdit: {
                ...this.state.currentEdit,
                file: null,
                fileblob: null
              }
            });
          })
          .catch();
      })
      .catch();
  };
  render() {
    let deleteMenu = null;
    if (this.state.showDeleteMenu)
      deleteMenu = (
        <div>
          <div
            style={{
              position: "fixed",
              backgroundColor: "white",
              zIndex: 301,
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: "300px",
              padding: "10px"
            }}
          >
            <h2 className="text-warning">Warning</h2>
            <hr />
            <p>
              You <strong>cannot</strong> undo deletion process.
            </p>
            <p>Proceed Delete?</p>
            <div style={{ textAlign: "right" }}>
              <button
                onClick={() => this.deleteFoodConfirm(this.state.currentEdit._id)}
                style={{ padding: "10px 30px" }}
                className="btn btn-warning"
              >
                Yes
              </button>
              <button
                onClick={this.deleteFoodCancel}
                style={{ padding: "10px 30px" }}
                className="btn btn-info"
              >
                No
              </button>
            </div>
          </div>
          <div
            onClick={this.deleteFoodCancel}
            style={{
              position: "fixed",
              zIndex: 300,
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              backgroundColor: "rgba(0,0,0,0.5)"
            }}
          />
        </div>
      );
    let editFoodStyle = {
      width: "450px",
      height: "500px"
    };
    if (isMobile) {
      editFoodStyle = {
        width: "100%",
        height: "100%"
      };
    }
    let editFoodMenu = null;
    let src = `${localhost}/${this.state.currentEdit.picture}`;
    if (this.state.currentEdit.file !== null) {
      src = this.state.currentEdit.fileblob;
    }

    if (this.state.showEditMenu)
      editFoodMenu = (
        <React.Fragment>
          <div
            style={{
              overflowY: "auto",
              position: "fixed",
              zIndex: 200,
              ...editFoodStyle,
              transform: "translate(-50%,-50%)",
              backgroundColor: "white",
              boxShadow: "1px 1px 5px black",
              left: "50%",
              top: "50%",
              padding: "20px",
              backfaceVisibility: "hidden"
            }}
          >
            <div style={{ display: "flex" }}>
              <div>
                <h2>Edit Menu</h2>
              </div>
              <div style={{ marginTop: "6px", marginLeft: "auto" }}>
                <i
                  onClick={this.onCancelEdit}
                  style={{ color: "#593196" }}
                  className="far fa-times-circle fa-2x"
                />
              </div>
            </div>
            <hr />
            <div className="form-group">
              <label>Name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                value={this.state.currentEdit.name}
                onChange={this.onChangeInputEdit}
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                className="form-control"
                type="number"
                name="price"
                value={this.state.currentEdit.price}
                onChange={this.onChangeInputEdit}
              />
            </div>
            <div className="form-group">
              <div>Picture</div>
              <img
                alt="food"
                style={{ width: "100px", height: "100px" }}
                src={src}
              />

              <input
                className="form-control-file"
                style={{ verticalAlign: "bottom" }}
                onChange={this.onChangeFile}
                type="file"
              />
            </div>
            <div className="form-group">
              <button onClick={this.onSaveEdit} className="btn btn-warning">
                Save
              </button>
              <button onClick={this.onCancelEdit} className="btn btn-primary">
                Cancel
              </button>
            </div>
          </div>
          <div
            onClick={this.onCancelEdit}
            style={{
              position: "fixed",
              zIndex: 199,
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              backgroundColor: "rgba(0,0,0,0.5)"
            }}
          />
        </React.Fragment>
      );

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
              <i
                onClick={() => this.editFoodOnClick(val._id)}
                style={{ color: "green" }}
                className="fas fa-edit fa-lg"
              />{" "}
              <i
                onClick={() => this.deleteFoodOnClick(val._id)}
                style={{ color: "red" }}
                className="fas fa-user-slash fa-lg"
              />
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
        {editFoodMenu}
        {deleteMenu}
      </React.Fragment>
    );
  }
}

export default Dashboard_Food;
