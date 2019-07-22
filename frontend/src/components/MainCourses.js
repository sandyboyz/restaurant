import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { Link } from "react-router-dom";
import "./MainCourses.css";
import queryString from "query-string";
import { localhost, fetchMainCourses, filterQueryString } from "../util/util";
import { addProduct } from "../actions/cartAction";
import { connect } from "react-redux";
import Cart from "./Cart";
import { toast } from "react-toastify";

class MainCourses extends Component {
  state = {
    foods: [],
    activePage: 1,
    limit: 4,
    total: 0,
    notFound: false
  };

  componentDidMount() {
    let { page } = queryString.parse(this.props.history.location.search);
    if (isNaN(+page)) page = 1;
    if (page !== undefined) {
      if (page === null || page === "") page = 1;
      this.setState({ activePage: +page }, () => {
        fetchMainCourses(this.state.activePage, this.state.limit)
          .then(res => {
            if (res.data.docs.length === 0 && res.data.total > 0) {
              this.setState({
                notFound: true
              });
            } else {
              this.setState({
                foods: res.data.docs,
                total: res.data.total,
                notFound: false
              });
            }
          })
          .catch(e => console.log(e));
      });
    }
  }

  goToPage = page => {
    fetchMainCourses(page, this.state.limit)
      .then(res => {
        this.setState({
          activePage: page,
          foods: res.data.docs,
          total: res.data.total
        });
      })
      .catch(e => console.log(e));
  };

  nextPage = () => {
    fetchMainCourses(this.state.activePage + 1, this.state.limit)
      .then(res => {
        this.setState({
          activePage: this.state.activePage + 1,
          foods: res.data.docs,
          total: res.data.total
        });
      })
      .catch(e => console.log(e));
  };
  prevPage = () => {
    fetchMainCourses(this.state.activePage - 1, this.state.limit)
      .then(res => {
        this.setState({
          activePage: this.state.activePage - 1,
          foods: res.data.docs,
          total: res.data.total
        });
      })
      .catch(e => console.log(e));
  };

  render() {
    let pagination = null;
    if (this.state.total > 0) {
      const pageNumber = Math.ceil(this.state.total / this.state.limit);
      pagination = new Array(pageNumber).fill(null).map((_, i) => {
        let link = `/food?${filterQueryString.call(this, "page", i + 1)}`;
        if (i === 0)
          link = `/food?${filterQueryString.call(this, "page", i + 1, true)}`;
        return (
          <PaginationItem key={i} active={this.state.activePage === i + 1}>
            <Link to={link}>
              <PaginationLink
                onClick={
                  this.state.activePage !== i + 1
                    ? () => this.goToPage(i + 1)
                    : null
                }
              >
                {i + 1}
              </PaginationLink>
            </Link>
          </PaginationItem>
        );
      });
    }
    let foods = "Loading Main Courses...";
    if (this.state.foods.length > 0) {
      foods = this.state.foods.map((val, i) => {
        return (
          <React.Fragment key={val._id}>
            <Col className="item" lg="3" md="6">
              <img src={`${localhost}/${val.picture}`} alt="maincourses" />
              <h6>{val.name}</h6>
              <div className="btn-wrap">
                <button
                  onClick={() => this.props.addProduct(val._id)}
                  className="btn btn-primary"
                >
                  Add to list
                </button>
                <button
                  onClick={() => {
                    if (!toast.isActive(5)) {
                      toast.info("Coming Soon", { toastId: 5, autoClose:2000 });
                    }
                  }}
                  className="btn btn-info"
                >
                  Details
                </button>
              </div>
              <p className="lead">{`${val.price.toLocaleString()} IDR`}</p>
            </Col>
            {(i + 1) % 4 === 0 ? <div className="w-100" /> : null}
          </React.Fragment>
        );
      });
    }
    if (this.state.notFound) {
      pagination = null;
      foods = <h1 style={{ margin: "auto" }}>Halaman tidak ditemukan</h1>;
    }
    return (
      <React.Fragment>
        <div style={{ textAlign: "center", marginTop: "25px" }}>
          <h1>Main Courses</h1>
          <img className="hrimg" src="../images/hrline.png" alt="hrline" />
        </div>
        <Pagination
          style={{ justifyContent: "center" }}
          aria-label="Page navigation example"
        >
          <PaginationItem disabled={this.state.activePage === 1}>
            <PaginationLink previous onClick={this.prevPage} />
          </PaginationItem>
          {pagination}
          <PaginationItem
            disabled={
              this.state.activePage ===
              Math.ceil(this.state.total / this.state.limit)
            }
          >
            <PaginationLink next onClick={this.nextPage} />
          </PaginationItem>
        </Pagination>

        <Container style={{ marginBottom: "50px" }}>
          <Row>{foods}</Row>
        </Container>

        <Cart />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});
export default connect(
  mapStateToProps,
  { addProduct }
)(MainCourses);
