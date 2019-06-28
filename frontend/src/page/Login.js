import React, { Component } from 'react'
import ComponentLogin from '../components/Login';
import { Auth } from '../util/util';
import {Redirect} from 'react-router-dom';

class Login extends Component {
    render() {
        if (Auth.authenticate()) return <Redirect to="/admin"/>
        return (
            <React.Fragment>
                <ComponentLogin {...this.props}/>
            </React.Fragment>
            
        )
    }
}

export default Login
