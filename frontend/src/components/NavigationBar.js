import React, { Component } from "react";
import classes from './NavigationBar.module.css';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

class NavigationBar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  
  render() {
   let shadowOnDashboard = {
     boxShadow:  "0px 1px 4px rgba(0,0,0,0.9)"
   }
   if (!this.props.boxShadow) shadowOnDashboard = {}
    return (
      <nav  ref={this.props.refKey} style={shadowOnDashboard}className={`${classes["nav"]} ${!this.props.transparent? `bg-primary ${classes["navbar-dark"]}` : null}`}>
        <Link className={`navbar-brand`} to="/">RESTaurant Project</Link>
        <button style={this.state.isOpen? {position:"fixed",right:"10px",top:"10px", border:"solid 1px white"} : null} onClick={this.toggle} className={classes["nav-toogle"]}>  
        {!this.state.isOpen ?  <i className={`fas fa-bars fa-2x ${!this.props.transparent? classes["toggle-icon"] : null}`}></i> : <i className={`fas fa-times fa-2x ${!this.props.transparent? classes["toggle-icon"] : null}`}></i> }
        
      

        </button>
        
        <div className={`${classes["nav-items"]} ${this.state.isOpen? classes["nav-items-sidedrawer"] : null}`}>
          <div className={classes["nav-sidedrawer-title"]}>
            Menu
          </div>
          <Link className={classes["nav-item"]} to="/food"><i className={`fas fa-utensils ${classes["nav-icon"]} ${!this.props.transparent ? classes["nav-icon-transparent"] : null}`}></i>Food</Link>
    <Link className={classes["nav-item"]} to="/dashboard/"><i className={`fas fa-pencil-ruler ${classes["nav-icon"]} ${!this.props.transparent ? classes["nav-icon-transparent"] : null}`}></i>CRUD</Link>
    <Link className={classes["nav-item"]} to="/about/"><i className={`fas fa-info-circle ${classes["nav-icon"]} ${!this.props.transparent ? classes["nav-icon-transparent"] : null}`}></i>About</Link>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.errors
})

export default connect(mapStateToProps)(NavigationBar);