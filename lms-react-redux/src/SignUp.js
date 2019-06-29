import React, { Component } from 'react'
import {connect} from 'react-redux'

class SignUp extends Component {
    state = {
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        bio: '',
        image_url: '',
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
        // let position = this.state.position
        if(this.state.position){
            fetch(`http://localhost:3000/api/v1/${this.state.position}s`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    user: this.state
                })
            }) 
            .then(res => res.json())
            .then(user => {
                localStorage.setItem("token", user.jwt)
                // console.log(Object.keys(user)[0])
                // console.log(user[Object.keys(user)[0]])
                this.props.changeUser(user[Object.keys(user)[0]]) //since either a teacher or student key is returned, utilizing Object keys was best
                this.props.history.push('/courses')
            })
        }
        // else if(this.state.position === 'student'){
        //     fetch(`http://localhost:3000/api/v1/${this.state.position}s`, {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Accept": "application/json"
        //         },
        //         body: JSON.stringify({
        //             student: this.state
        //         })
        //     }) 
        //     .then(res => res.json())
        //     .then(user => {
        //         localStorage.setItem("token", user.jwt)
        //         // console.log(user)
        //         this.props.changeUser(user.student)
        //         this.props.history.push('/home')
        //     })
        // }
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

                    <div className="field">
                        <label>First Name</label>
                        <input type="text" name="first_name" onChange={this.handleOnChange} value={this.state.first_name} placeholder="First Name"/>
                    </div>

                    <div className="field">
                        <label>Last Name</label>
                        <input type="text" name="last_name" onChange={this.handleOnChange} value={this.state.last_name} placeholder="Last Name"/>
                    </div>

                    <div className="field">
                        <label>Bio</label>
                        <input type="text" name="bio" onChange={this.handleOnChange} value={this.state.bio} placeholder="Small Bio"/>
                    </div>

                    <div className="field">
                        <label>Image URL</label>
                        <input type="text" name="image_url" onChange={this.handleOnChange} value={this.state.image_url} placeholder="Image URL"/>
                    </div>
                    

                    <button className="ui button" type="submit">Sign Up</button>
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

export default connect(null, mapDispatchToProps)(SignUp)
