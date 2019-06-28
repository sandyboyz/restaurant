import React, { Component } from 'react'
import Component404 from '../components/Component404';
import NavigationBar from '../components/NavigationBar';

export class Page404 extends Component {
    render() {
        return (
            <React.Fragment>  
                <NavigationBar transparent/>
                <Component404 />
            </React.Fragment>
           
        )
    }
}

export default Page404
