import React, { Component } from 'react'
import ComponentLogin from '../components/Login';
import {connect} from 'react-redux';
import {loginUser, clearError} from '../actions/authAction';

class Login extends Component {
    render() {
        return (
            <React.Fragment>
                <ComponentLogin {...this.props}/>
            </React.Fragment>
            
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {loginUser,clearError})(Login)
