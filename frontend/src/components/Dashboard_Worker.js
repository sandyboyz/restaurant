import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { localhost } from "../util/util";
import { isMobile } from "react-device-detect";
export class Dashboard_Worker extends Component {
  state = {
    worker: [],
    name: [],
    edited: [],
    addWorker: {
      name: "",
      password: "",
      confirm: ""
    },
    error: [],
    deleteConfirmId: null
  };
  componentWillMount() {
    if (this.props.auth.user.role !== "admin") {
      this.props.history.push("/dashboard");
    }
  }
  componentDidMount() {
    axios
      .get(`${localhost}/api/users/get-worker`)
      .then(res => {
        const edited = res.data.map(val => {
          return {
            edit: false,
            _id: val._id
          };
        });
        const name = res.data.map(val => {
          return {
            name: val.workerName,
            _id: val._id
          };
        });
        this.setState({
          worker: res.data,
          edited,
          name
        });
      })
      .catch(e => console.log(e));
  }

  /* 
  NOTE Edit/Delete/View Crud
  */
  editWorker = id => {
    const originalArray = this.state.edited.filter(data => {
      return data._id !== id;
    });

    const oneArray = this.state.edited.filter(data => {
      return data._id === id;
    });
    const editedArray = {
      _id: id,
      edit: !oneArray[0].edit
    };
    this.setState({
      edited: [...originalArray, editedArray]
    });
  };

  discardChanges = id => {
    const originalArray = this.state.edited.filter(data => {
      return data._id !== id;
    });
    const oneArray = this.state.edited.filter(data => {
      return data._id === id;
    });
    const originalArrayName = this.state.name.filter(data => {
      return data._id !== id;
    });
    const restoreName = {
      _id: id,
      name: this.state.worker.filter(data => data._id === id)[0].workerName
    };
    const editedArray = {
      _id: id,
      edit: !oneArray[0].edit
    };
    this.setState({
      edited: [...originalArray, editedArray],
      name: [...originalArrayName, restoreName]
    });
  };

  editWorkerName = (event, id) => {
    const originalArray = this.state.name.filter(data => {
      return data._id !== id;
    });

    const editedName = {
      _id: id,
      name: event.target.value
    };
    this.setState({
      name: [...originalArray, editedName]
    });
  };

  saveChanges = id => {
    const [item] = this.state.name.filter(data => data._id === id);
    const [oneArray] = this.state.edited.filter(data => {
      return data._id === id;
    });

    const fullArray = this.state.edited.filter(data => {
      return data._id !== id;
    });
    const editedArray = {
      _id: id,
      edit: !oneArray.edit
    };
    axios
      .put(`${localhost}/api/users/update-worker/${id}`, {
        workerName: item.name
      })
      .then(res => {
        axios
          .get(`${localhost}/api/users/get-worker`)
          .then(res => {
            this.setState({
              worker: res.data,
              edited: [...fullArray, editedArray]
            });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };
  deleteWorker = id => {
    axios
      .delete(`${localhost}/api/users/delete-worker/${id}`)
      .then(res => {
        axios
          .get(`${localhost}/api/users/get-worker`)
          .then(res => {
            this.setState(
              {
                worker: res.data,
                deleteConfirmId: null
              },
              () => this.props.toggleModalShow()
            );
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  /* 
  NOTE Add Worker
  */
  formOnChange = event => {
    const addWorker = {
      ...this.state.addWorker,
      [event.target.name]: event.target.value
    };
    this.setState({
      addWorker
    });
  };
  formOnClick = () => {
    let error = [];
    let errorTrigger = false;
    if (this.state.addWorker.name.length < 3) {
      error.push(
        <h6 key="formname" style={{ color: "red" }}>Name must be minimal 3 character.</h6>
      );
      errorTrigger = true;
    }
    if (
      this.state.addWorker.password.length > 0 &&
      this.state.addWorker.password !== this.state.addWorker.confirm
    ) {
      error.push(<h6 key="formpassword" style={{ color: "red" }}>Password must be match.</h6>);
      errorTrigger = true;
    }

    if (errorTrigger) {
      this.setState({
        error
      });
    } else {
      axios
        .post(`${localhost}/api/users/register-worker`, {
          workerName: this.state.addWorker.name,
          password: this.state.addWorker.password
        })
        .then(res => {
          axios
            .get(`${localhost}/api/users/get-worker`)
            .then(res => {
              const edited = res.data.map(val => {
                return {
                  edit: false,
                  _id: val._id
                };
              });
              const name = res.data.map(val => {
                return {
                  name: val.workerName,
                  _id: val._id
                };
              });
              this.setState({
                worker: res.data,
                edited,
                name,
                error: [],
                addWorker: {
                  name: "",
                  password: "",
                  confirm: ""
                }
              });
            })
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
    }
  };
  confirmDelete = id => {
    this.setState(
      {
        deleteConfirmId: id
      },
      () => this.props.toggleModalShow()
    );
  };
  cancelDelete = () => {
    this.setState(
      {
        delteConfirmId: null
      },
      () => this.props.toggleModalShow()
    );
  };

  render() {
    let workerList = (
      <tr>
        <td> </td>
        <td> </td>
        <td> </td>
      </tr>
    );
    if (this.state.worker.length > 0) {
      workerList = this.state.worker.map(val => {
        const filterEdit = this.state.edited.filter(data => {
          return data._id === val._id;
        });
        const filterName = this.state.name.filter(data => {
          return data._id === val._id;
        });
        return (
          <tr key={val._id}>
            <td>{val.workerID}</td>
            <td style={{ position: "relative" }}>
              {filterEdit[0].edit === false ? (
                val.workerName
              ) : (
                <React.Fragment>
                  <input
                    className="form-control"
                    value={filterName[0].name}
                    onChange={event => this.editWorkerName(event, val._id)}
                    type="text"
                  />
                  <button
                    onClick={() => this.saveChanges(val._id)}
                    style={{ width: "100%", borderBottom: "solid 1px white" }}
                    className="btn btn-info"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => this.discardChanges(val._id)}
                    style={{ width: "100%" }}
                    className="btn btn-danger"
                  >
                    Discard
                  </button>
                </React.Fragment>
              )}
            </td>
            <td>
              <i
                onClick={() => this.editWorker(val._id)}
                style={{ color: "green" }}
                className="fas fa-edit fa-lg"
              />{" "}
              <i
                onClick={() => this.confirmDelete(val._id)}
                style={{ color: "red" }}
                className="fas fa-user-slash fa-lg"
              />
            </td>
          </tr>
        );
      });
    }
    return (
      <div
        style={{
          width:
            this.props.show && isMobile && window.innerWidth < 361
              ? "75%"
              : "100%",
          padding: "10px 5px"
        }}
      >
        <h2>Worker List</h2>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%" }}
            className="table table-bordered table-striped"
          >
            <thead className="bg-primary text-light">
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Edit/Delete</td>
              </tr>
            </thead>
            <tbody>{workerList}</tbody>
          </table>
        </div>

        <h2>Add Worker</h2>
        <div className="form-group">
          <label>Name</label>
          <input
            onChange={this.formOnChange}
            name="name"
            value={this.state.addWorker.name}
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            onChange={this.formOnChange}
            name="password"
            value={this.state.addWorker.password}
            className="form-control"
            type="password"
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            onChange={this.formOnChange}
            name="confirm"
            value={this.state.addWorker.confirm}
            className="form-control"
            type="password"
          />
        </div>
        {this.state.error.length > 0 ? this.state.error : null}
        <div className="form-group">
          <button onClick={this.formOnClick} className="btn btn-primary">
            ADD
          </button>
        </div>
        {this.props.modalShow ? (
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
                  onClick={() => this.deleteWorker(this.state.deleteConfirmId)}
                  style={{ padding: "10px 30px" }}
                  className="btn btn-warning"
                >
                  Yes
                </button>
                <button
                  onClick={this.cancelDelete}
                  style={{ padding: "10px 30px" }}
                  className="btn btn-info"
                >
                  No
                </button>
              </div>
            </div>
            <div
              onClick={this.cancelDelete}
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
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Dashboard_Worker);
