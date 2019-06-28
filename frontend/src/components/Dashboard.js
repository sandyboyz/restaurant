import React, { Component } from 'react'

export class Dashboard extends Component {
    render() {
        console.log(this.props);
        
        return (
            <div>
                <h1>This is dasboard menu</h1>
                <button onClick={() => {
                    localStorage.removeItem("authenticate");
                    this.props.history.push('/login');    
                }}className="btn btn-primary">Logout</button>
            </div>
        )
    }
}

export default Dashboard
