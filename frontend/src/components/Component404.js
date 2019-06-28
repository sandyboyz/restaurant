import React, { Component } from 'react';
import classes from './Component404.module.css';
import {Link} from 'react-router-dom';
export class Component404 extends Component {
    render() {
        return (
            <div className={classes["container"]}>
                    <div style={{padding:"0 30px"}}>
                    <h1 style={{color:"white",fontWeight:800,fontSize:"4em"}}>404</h1>
                    <h4 style={{color:"white",fontWeight:100, fontSize:"1em" }}>WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND</h4>
                    <Link to="/"><button style={{fontSize:"0.6em",padding:"0.5em 1em",borderRadius:"100px"}}className="btn btn-primary">Back To Home</button></Link>   
                </div>
            </div>
        )
    }
}

export default Component404
