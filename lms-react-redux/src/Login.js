import React, {Component} from 'react'
import {connect} from 'react-redux'

class Login extends Component {
    state = {
        username: '',
        password: '',
        position: ''
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleOnClick = (position) => {
        this.setState({
            position: position
        })
    } 

    handleOnSubmit = (e) => {
        e.preventDefault()
        // console.log(e.target)
        if(this.state.position){
            fetch("http://localhost:3000/api/v1/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(
                    this.state
                )
                })
            .then(res => res.json())
            .then(user => {
                localStorage.setItem("token", user.jwt)
                // console.log(user.user)
                this.props.changeUser(user.user)
                this.props.history.push('/courses')
            })
        }
        else{
            alert('Please choose if a teacher or student')
        }  
    }
    render() {
        // console.log(this.props.history)
        return (
            <div className="ui container">
                <div className="ui buttons">
                        <button onClick={() => this.handleOnClick('teacher')} className="ui button">Teacher</button>
                        <div className="or"></div>
                        <button onClick={() => this.handleOnClick('student')} className="ui button">Student</button>
                </div>
                <br></br>
                <br></br>
                <form className="ui form" onSubmit={this.handleOnSubmit}>
                    <div className="field">
                        <label>Username</label>
                        <input type="text" name="username" onChange={this.handleOnChange} value={this.state.username} placeholder="User Name"/>
                    </div>

                    <div className="field">
                        <label>Password</label>
                        <input type="password" name="password" onChange={this.handleOnChange} value={this.state.password} placeholder=" Password"/>
                    </div>

                    <button className="ui button" type="submit">Login</button>
                </form>      
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        changeUser: (userObj) => {
            dispatch({type:"SET_USER", payload: userObj})
        }
    }
} 

export default connect(null, mapDispatchToProps)(Login)