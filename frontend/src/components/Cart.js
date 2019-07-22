import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import {
  addProduct,
  deleteProduct,
  removeProduct,
  resetCart
} from "../actions/cartAction";
import "./Cart.css";
import { localhost } from "../util/util";
import Axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Cart extends Component {
  state = {
    mouseDown: "",
    show: false,
    opacity: 0
  };

  myRef = React.createRef();
  
  transition = "";

  componentDidUpdate(prevProps) {
    if (this.props.cart.list.length === 1 && prevProps.cart.list.length === 0) {
      this.transition = setTimeout(() => {
        this.setState({
          opacity: 1
        });
      }, 100);
    }
  }
  componentWillUnmount() {
    clearTimeout(this.transition);
  }

  onMouseDown = id => {
    this.setState({
      mouseDown: setTimeout(() => {
        this.props.removeProduct(id);
      }, 1500)
    });
  };

  onMouseUp = event => {
    if (this.state.mouseDown) {
      clearTimeout(this.state.mouseDown);
    }
  };

  showCart = () => {
    document.body.classList.add("cart-open");
    this.setState({
      show: true
    });
  };

  confirmOrder = () => {
    const order = {
      name: this.myRef.current.value,
      order: this.props.cart.list.map(val => {
        return {
          _id: val.id,
          quantity: val.quantity
        };
      })
    };
    Axios.post(`${localhost}/api/order`, order)
      .then(res => {
        toast.success("Order successfully");
        document.body.classList.remove("cart-open");
        this.setState(
          {
            show: false,
            opacity: 0
          },
          () => this.props.resetCart()
        );
      })
      .catch(err => {
        toast.error(err.response.data);
        document.body.classList.remove("cart-open");
      });
  };
  render() {
    let list = [...this.props.cart.list];

    if (list.length > 0) {
      list = list.map(item => (
        <Row style={{ marginBottom: "8px" }} key={item.id}>
          <Col xs="4" sm="4">
            {item.name}
          </Col>
          <Col xs="2" sm="2">
            <div style={{ display: "flex" }}>
              <button
                onMouseDown={() => this.onMouseDown(item.id)}
                onMouseUp={this.onMouseUp}
                onTouchStart={() => this.onMouseDown(item.id)}
                onTouchEnd={this.onMouseUp}
                onClick={() => this.props.deleteProduct(item.id)}
                style={{ width: "36px", height: "36px" }}
                className="btn btn-primary"
              >
                -
              </button>

              <p
                style={{
                  textOverflow: "ellipsis",
                  margin: "auto",
                  padding: "5px"
                }}
              >
                {item.quantity}
              </p>

              <button
                onClick={() => this.props.addProduct(item.id)}
                style={{ width: "36px", height: "36px" }}
                className="btn btn-primary"
              >
                +
              </button>
            </div>
          </Col>
          <Col xs={{ size: 4, offset: 2 }} sm={{ size: 6, offset: 0 }}>
            <div>
              <strong>{item.price.toLocaleString()}</strong>
            </div>
          </Col>
        </Row>
      ));
      list.push(
        <h5 style={{ marginTop: "20px" }} key="totalPrice">
          {`Total Price : ${this.props.cart.totalPrice.toLocaleString()}`}
        </h5>
      );
    }

    let miniCart = null;
    let total = 0;
    if (this.props.cart.list.length > 0) {
      total = this.props.cart.list.reduce((prev, curr) => {
        return prev + curr.quantity;
      }, 0);
      miniCart = (
        <div
          onClick={this.showCart}
          style={{
            opacity: this.state.opacity,
            background: "linear-gradient(to bottom, #a20dbd 5%, #c123de 100%)",
            position: "fixed",
            color: "white",
            transition: "1s",
            bottom: 5,
            left: "50%",
            transform: "translateX(-50%)",
            padding: "10px 20px",
            borderRadius: "20px",
            whiteSpace: "nowrap"
          }}
        >
          <i style={{ marginRight: "5px" }} className="fas fa-shopping-cart" />
          {this.props.cart.list.length} Item
          {this.props.cart.list.length > 1 ? "s" : null} | Total : {total}
        </div>
      );
    }
    return (
      <React.Fragment>
        {this.state.show ? (
          <div
            style={{
              zIndex: 400,
              overflowY: "scroll",
              position: "fixed",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              backgroundColor: "white"
            }}
          >
            <Container>
              <div
                style={{
                  display: "flex",
                  margin: "20px 0",
                  alignItems: "baseline"
                }}
              >
                <h1>Food Order</h1>
                <i
                  onClick={() => {
                    document.body.classList.remove("cart-open");
                    if (this.props.cart.list.length > 0)
                      this.setState({ show: false });
                    else this.setState({ show: false, opacity: 0 });
                  }}
                  style={{ marginLeft: "auto" }}
                  className="fa fa-2x fa-times"
                />
              </div>
              <hr style={{ marginTop: "-10px" }} />

              {list}
              <div className="form-group">
                <label htmlFor="">Name</label>
                <input
                  ref={this.myRef}
                  style={{ maxWidth: "300px" }}
                  type="text"
                  className="form-control"
                />
              </div>
              <button onClick={this.confirmOrder} className="btn btn-primary">
                Order
              </button>
            </Container>
          </div>
        ) : null}
        {miniCart}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { addProduct, deleteProduct, removeProduct, resetCart }
)(Cart);
