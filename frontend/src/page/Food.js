import React, { Component } from 'react'
import MainCourses from '../components/MainCourses';
import NavigationBar from '../components/NavigationBar';

class Food extends Component {
 
    render() {
        return (
            <React.Fragment>
                <NavigationBar />
                <MainCourses />
            </React.Fragment>
            
        )
    }
}

export default Food
