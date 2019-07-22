import React, { Component } from "react";
import { isMobile } from "react-device-detect";
import Axios from "axios";
import { localhost } from "../util/util";

export class DashboardOrder extends Component {
  state = {
      orderList: []
  };
  componentDidMount() {
    Axios.get(`${localhost}/api/order`)
      .then(res => {this.setState({orderList: res.data})})
      .catch(err => console.log(err));
  }
  render() {
    let orderList = (
      <tr>
        <td />
        <td />
        <td />
      </tr>
    );
    if (this.state.orderList.length > 0){
        orderList=this.state.orderList.map(val => {
            return <tr key={val._id}>
                <td>{val._id}</td>
                <td>{val.name}</td>
                <td>{val.orderDate}/{val.orderTime}</td>
                <td>
                    {val.order.map(item => {
                        return <React.Fragment key={item._id}>
                            {item.name} 
                            <br />
                            {item.price} x {item.quantity}
                            <br />
                        </React.Fragment>
                    })}
                    <strong>Total Price : {val.totalPrice}</strong>
                </td>
            </tr>
        })
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
        <h2>Order List</h2>
        <hr />
        <div style={{ overflow: "auto", height:"80vh" }}>
          <table
            style={{ width: "100%" }}
            className="table table-bordered table-striped"
          >
            <thead className="bg-primary text-light">
              <tr>
                <td>Order ID</td>
                <td>Name</td>
                <td>OrderDate/Time</td>
                <td>Order Items</td>
              </tr>
            </thead>
            <tbody>{orderList}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default DashboardOrder;
