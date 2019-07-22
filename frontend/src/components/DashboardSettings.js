import React, { Component } from "react";
import { isMobile } from "react-device-detect";
import { toast } from "react-toastify";
import Axios from "axios";
import { localhost } from "../util/util";

export class DashboardSettings extends Component {
  resetWorker = () => {
    Axios.post(`${localhost}/api/super/reset-worker`)
      .then(() => toast.success("Reset Worker"))
      .catch(err => console.log(err));
  };
  resetFood = () => {
    Axios.post(`${localhost}/api/super/reset-food`)
      .then(() => toast.success("Reset Food"))
      .catch(err => console.log(err));
  };
  resetOrder = () => {
    Axios.post(`${localhost}/api/super/reset-order`)
      .then(() => toast.success("Reset Order"))
      .catch(err => console.log(err));
  };
  render() {
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
        <h2>Setting Menu</h2>
        <hr />
        <div
          style={{
            marginBottom: "5px",
            border: "solid 1px rgba(89, 49, 150, 0.2)",
            width: "250px",
            padding: "10px"
          }}
        >
          <h5>Reset Worker</h5>
          <p>Delete all worker and reset ID to 1</p>
          <button onClick={this.resetWorker} style={{ width: "70%" }} className="btn btn-primary">
            RESET WORKER
          </button>
        </div>
        <div
          style={{
            marginBottom: "5px",
            border: "solid 1px rgba(89, 49, 150, 0.2)",
            width: "250px",
            padding: "10px"
          }}
        >
          <h5>Reset Food</h5>
          <p>Reset food to initial state</p>
          <button onClick={this.resetFood} style={{ width: "70%" }} className="btn btn-primary">
            RESET FOOD
          </button>
        </div>
        <div
          style={{
            marginBottom: "5px",
            border: "solid 1px rgba(89, 49, 150, 0.2)",
            width: "250px",
            padding: "10px"
          }}
        >
          <h5>Reset Order</h5>
          <p>Delete all order</p>
          <button onClick={this.resetOrder} style={{ width: "70%" }} className="btn btn-primary">
            RESET ORDER
          </button>
        </div>
      </div>
    );
  }
}

export default DashboardSettings;
