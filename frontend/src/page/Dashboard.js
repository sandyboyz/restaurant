import React, { Component } from 'react'
import ComponentDashboard from '../components/Dashboard';
import {connect } from 'react-redux';
import {logoutUser} from '../actions/authAction';
import NavigationBar from '../components/NavigationBar';

export class Dashboard extends Component {
    render() {
        return (
            <React.Fragment>
                <NavigationBar boxShadow/>
                <ComponentDashboard {...this.props} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(Dashboard)
