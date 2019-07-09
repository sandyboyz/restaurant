import React, { Component } from "react";
import {isMobile} from "react-device-detect";
import {Link} from 'react-router-dom';


export class Sidebar extends Component {
  render() {
      let scalableDetect = 0;
      if(isMobile && this.props.showContentMenu){
        scalableDetect = 20;
      }
      let display = "none";
      if (this.props.showContentMenu) {
        display = "flex";
      }
      let adminFeature = null;
      if (this.props.auth.user.role === "admin") {
          adminFeature = (<Link to="/dashboard/worker" style={{cursor:"pointer",marginBottom:"10px"}}>
                  <img style={{width:"32px",height:"32px", fill:"white"}} src="../images/chef.svg" alt=""/>
                  <h5 style={{fontWeight:300}}>Worker</h5>
              </Link>)
      }
    return (
      
      <div className="text-center bg-light text-primary" style={{flexGrow:0, flexShrink:0, borderRight:"solid 6px rgba(89,49,150,0.1)", zIndex:3,paddingTop:"20px", transition:"0.25s ease-out",position:"relative", overflowX:"hidden", width:`${this.props.sidebarX-scalableDetect}px` }}>
          <div style={{display, flexDirection:"column"}}>
          <Link to="/dashboard" style={{cursor:"pointer",marginBottom:"10px"}}>
                  <img style={{width:"32px",height:"32px", fill:"white"}} src="../images/web-house.svg" alt=""/>
                  <h5 style={{fontWeight:300}}>Home</h5>
              </Link>
              {adminFeature}
              <Link to="/dashboard/food" style={{cursor:"pointer", marginBottom:"10px"}}>
                  <img style={{width:"32px",height:"32px", fill:"white"}} src="../images/salad.svg" alt=""/>
                  <h5 style={{fontWeight:300}}>Food</h5>
              </Link>
              <div onClick={this.props.logoutUser}style={{cursor:"pointer",}}>
                  <img style={{width:"32px",height:"32px", fill:"white"}} src="../images/logout.svg" alt=""/>
                  <h5 style={{fontWeight:300}}>Logout</h5>
              </div>
          </div>
      </div>
    );
  }
}

export default Sidebar;
