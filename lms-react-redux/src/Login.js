import React, {Component} from 'react'
import {connect} from 'react-redux'
import student from './noun_student_63368.svg'
import teacher from './noun_Teacher_642198.svg'

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
                if(user.failure){
                    // console.log(user.failure)
                    // alert(user.failure)
                    this.props.handleErrorMessage(user.failure)
                }
                else{
                    this.props.changeUser(user.user)
                    this.props.history.push('/courses')
                }
            })
        }
        else{
            // alert('Please choose if a teacher or student')
            this.props.handleErrorMessage("Please select if a teacher or student")
        }  
    }
    render() {
        // console.log(this.props.errorState)
        // console.log(this.props.errorState.errorMessage)
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
                        <input type="text" name="username" required onChange={this.handleOnChange} value={this.state.username} placeholder="User Name"/>
                    </div>

                    <div className="field">
                        <label>Password</label>
                        <input type="password" name="password" required onChange={this.handleOnChange} value={this.state.password} placeholder=" Password"/>
                    </div>

                    <button className="ui button" type="submit">Login</button>
                </form>
                <br></br>
                <br></br>

                {this.state.position ?
                    <div className="ui segment" style={{width: "100px", height: "100px", margin: "auto"}}>
                        {
                        this.state.position === "teacher" ?
                            <img src={teacher}></img>
                            :
                            <img src={student}></img>
                        }
                    </div> 
                    
                    : 
                    null
                }  

                {this.props.errorState.errors ? 
                <div className="ui error message">
                <div className="header">
                    Errors with your submission
                </div>
                <ul className="list">
                    <li>{this.props.errorState.errorMessage}</li>
                </ul>
                </div>
                :
                null
                }
               
    
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