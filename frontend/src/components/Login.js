import React, { Component } from 'react'
import classes from './Login.module.css';
import { Link } from 'react-router-dom';


class Login extends Component {
    state = {
        role: 'Admin',
        workerID: '',
        password : '',
    }
    changeInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
           
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.role !== this.state.role) {
            this.setState({
                password : ''
            });
        }
    }

    handlerSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('authenticate', '1');
        this.props.history.push('/admin');
    }
    render() {
        
        console.log(this.props);
        
        let workerInput = null;
        let submitCondition = false;
        switch(this.state.role){
            case "Admin":
                submitCondition = this.state.password.length > 0;
                break;
            case "Worker":
                submitCondition = this.state.workerID.length > 0 && this.state.password.length > 0;
                break;
            default:
        }
        
        if (this.state.role === 'Worker')(
            workerInput = (<div className="form-group">
            <label htmlFor="worker">Worker ID</label>   
            <input 
                onChange={this.changeInput} 
                value={this.state.workerID}
                placeholder="Input ID" 
                id="worker" 
                type="text" 
                name="workerID" 
                className="form-control"/> 
            </div>))
        return (
            <div className={classes["container"]}>
                <div className={classes["login-box"]}>
                    <div className={classes["wrapper"]}>
                        <div style={{
                            position:"absolute",
                            top:"2%",
                            left:"2%",
                            fontWeight:800
                        }}><Link to="/"><i style={{fontSize:"20px", marginRight:"5px"}}className="fas fa-reply"></i>Back To Home</Link></div>
                        <h3>Login System</h3>
                        
                        <form onSubmit={this.handlerSubmit}>
                            <div className="form-group">
                            <label htmlFor="role">Role</label>   
                            <select id="role" name="role" value={this.state.role} onChange={this.changeInput} className="form-control">
                                <option value="Admin">Admin</option>
                                <option value="Worker">Worker</option>    
                            </select> 
                            </div>
                            {workerInput}
                            <div className="form-group">
                            <label htmlFor="password">Password</label>   
                            <input 
                                onChange={this.changeInput} 
                                value={this.state.password} 
                                placeholder="Input password" 
                                id="password" 
                                type="password" 
                                name="password" 
                                className="form-control"/> 
                            </div>
                            <button disabled={!submitCondition} style={{marginTop:"20px", width:"100%", height:"40px"}}className="btn btn-primary" type="submit">Login</button> 
                        </form>
                    </div>                    
                </div>
                
            </div>
        )
    }
}

export default Login
