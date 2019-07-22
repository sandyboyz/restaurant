import React, { Component } from "react";
import axios from "axios";
import { localhost } from "../util/util";
import PropTypes from "prop-types";
import { setAuthToken } from "../util/AuthService";
import Sidebar from "./Sidebar";
import { Swipeable } from "react-swipeable";
import { Switch, Route, Redirect } from "react-router-dom";
import DashboardWorker from "./Dashboard_Worker";
import DashboardFood from "./Dashboard_Food";
import DashboardOrder from "./DashboardOrder";
import DashboardSettings from "./DashboardSettings";

const config = {
  trackMouse: true,
  trackTouch: true,
  delta: 50,
  rotationAngle: 0,
  preventDefaultTouchmoveEvent: false
};

export class Dashboard extends Component {
  state = {
    sidebarX: {
      start: 5,
      end: 5
    },
    show: false,
    modalShow: false
  };
  sidebarSwiping = eventData => {
    if (eventData.dir === "Left" || eventData.dir === "Right") {
      this.setState({
        sidebarX: {
          ...this.state.sidebarX,
          start: this.state.sidebarX.end - eventData.deltaX
        }
      });
    }
  };
  sidebarSwipedRight = eventData => {
    if(eventData.velocity > 0.6) {
      this.setState({
        sidebarX: {
          start: 100,
          end: 100
        },
        show: true
      });
    }
  };
  sidebarSwipedLeft = eventData => {
    if (eventData.velocity > 0.6) {
      this.setState({
        sidebarX: {
          start: 5,
          end: 5
        },
        show: false
      });
    }
  };

  toggleMenu = () => {
    let sidebarX = {
      start: 100,
      end: 100
    };
    if (this.state.show) {
      sidebarX = {
        start: 5,
        end: 5
      };
    }
    this.setState({
      sidebarX,
      show: !this.state.show
    });
  };

  toggleModalShow = (cb = (f) => f) => {
    this.setState({
      modalShow: !this.state.modalShow
    }, cb);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      setAuthToken(localStorage.jwtToken);
      axios
        .post(`${localhost}/api/users/checkToken`)
        .then(() => {})
        .catch(err => {
          this.props.logoutUser();
        });
    }
  }
  componentWillReceiveProps(props){
    if (props.auth.isAuthenticated) {
      setAuthToken(localStorage.jwtToken);
      axios
        .post(`${localhost}/api/users/checkToken`)
        .then(() => {})
        .catch(err => {
          props.logoutUser();
        });
    }
  }
 
  render() {
    return (
      <Swipeable
        style={{
          display: "flex",
          minHeight: "100vh",
          overflowX: "hidden",
        }}
        // className="bg-danger text-light text-center"
        onSwipedRight={this.sidebarSwipedRight}
        onSwipedLeft={this.sidebarSwipedLeft}
        {...config}
      >
        <Sidebar
          {...this.props}
          sidebarX={this.state.sidebarX.start}
          showContentMenu={this.state.show}
        />
        <Switch>
        <Route path="/dashboard/" exact render={() => <div style={{ paddingLeft: "10px", paddingTop: "5px" }}>
          <h1>
            Welcome, {this.props.auth.user.name || this.props.auth.user.role}
          </h1>
          <h5 style={{ fontWeight: 300 }}>
            You can click sidebar button or swipe right your screen to open
            sidebar menu
          </h5>
          <button
            className="btn btn-primary mr-1"
            onClick={() => this.toggleMenu()}
          >
            Sidebar
          </button>
          {/* {this.state.show ? <div onClick={() => this.toggleMenu()} style={{top:0, left:0, zIndex:2,position:"fixed", height:"100%", width:"100%", backgroundColor:"rgba(255,255,255,0.85)"}}></div>: null} */}
        </div>} />
        <Route path="/dashboard/worker" render={props => <DashboardWorker {...props} show={this.state.show} modalShow={this.state.modalShow} toggleModalShow={this.toggleModalShow} />} />
      <Route path="/dashboard/food" render={props => <DashboardFood {...props} show={this.state.show}/>} />
        <Route path="/dashboard/order" render={props => <DashboardOrder {...props} show={this.state.show} />}   />
        <Route path="/dashboard/settings" render={props => <DashboardSettings {...props} show={this.state.show} />}   />
        <Route path="/dashboard/*" render={() => <Redirect to="/dashboard"/>}/>
        </Switch>
        
        
      </Swipeable>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired
};

export default Dashboard;
