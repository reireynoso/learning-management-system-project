import React, { Component } from 'react'
import {connect} from 'react-redux'
import teacher from './noun_Teacher_642198.svg'
import student from './noun_student_63368.svg'

class SignUp extends Component {
    state = {
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        bio: '',
        image_url: '',
        position: '',
        errors: []
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

    timeOut = () => {
        window.setTimeout(() => {
            this.setState({
              errors: []
            });
          }, 2000);
    }

    handleOnSubmit = (e) => {
        e.preventDefault()
        const {username, password, first_name,last_name,bio,image_url,position} = this.state
        // console.log(e.target)
        // let position = this.state.position
        if(position){
            fetch(`http://localhost:3000/api/v1/${this.state.position}s`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                // body: JSON.stringify({
                //     user: this.state
                // })
                body: JSON.stringify({
                    user: {
                        username: username,
                        password: password,
                        first_name: first_name,
                        last_name: last_name,
                        bio: bio,
                        image_url: image_url,
                        position: position
                    }
                })
            }) 
            .then(res => res.json())
            .then(user => {
                // console.log(user.errors)
                if(user.errors){
                    // alert(user.errors)
                    this.setState({
                        errors: user.errors
                    })
                    this.timeOut()
                }
                else{
                    localStorage.setItem("token", user.jwt)
                    // console.log(Object.keys(user)[0])
                    // console.log(user[Object.keys(user)[0]])
                    this.props.changeUser(user[Object.keys(user)[0]]) //since either a teacher or student key is returned, utilizing Object keys was best
                    this.props.history.push('/courses')
                } 
            })
        }
        else{
            // alert('Please choose if a teacher or student')
            this.setState({
                errors: [...this.state.errors, "Please choose if a teacher or student"]
            })
            this.timeOut()
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

                    <div className="field">
                        <label>First Name</label>
                        <input type="text" name="first_name" required onChange={this.handleOnChange} value={this.state.first_name} placeholder="First Name"/>
                    </div>

                    <div className="field">
                        <label>Last Name</label>
                        <input type="text" name="last_name" required onChange={this.handleOnChange} value={this.state.last_name} placeholder="Last Name"/>
                    </div>

                    <div className="field">
                        <label>Bio</label>
                        <input type="text" name="bio" required onChange={this.handleOnChange} value={this.state.bio} placeholder="Small Bio"/>
                    </div>

                    <div className="field">
                        <label>Image URL</label>
                        <input type="text" name="image_url" required onChange={this.handleOnChange} value={this.state.image_url} placeholder="Image URL"/>
                    </div>
                    

                    <button className="ui button" type="submit">Sign Up</button>
                </form>      
                <br></br>
                <br></br>
                
                {
                    this.state.errors.length !== 0 ? 

                    <div className="ui error message">
                        <div className="header">
                            Errors with your submission
                        </div>
                        <ul className="list">
                        {this.state.errors.map(error => {
                            return <li key={this.state.errors.indexOf(error)}>{error}</li>
                        })
                        }
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

export default connect(null, mapDispatchToProps)(SignUp)
