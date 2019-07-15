import React, { Component } from 'react'
import {connect} from 'react-redux'

const newCourseFormStyle = {
    border: "2px solid black",
    height: "50vh",
    marginTop: "40px",
    width: "50vw",
    borderRadius: "20px"
}

class NewCourseForm extends Component {
    state={
        name: '',
        teacher_id: '',
        subject_id: '',
        errors: ''
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            teacher_id: this.props.currentUser.id
        })
    }

    handleSubmit = (e) => {
        const token = localStorage.getItem("token")
        e.preventDefault()
        // console.log(this.state)
        if(this.state.subject_id){

        
        fetch(`https://lms-api-rails.herokuapp.com/api/v1/teachers/${this.state.teacher_id}/courses`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                course: {
                    name: this.state.name,
                    teacher_id: this.state.teacher_id,
                    subject_id: this.state.subject_id,
                }
            })
        })
        .then(resp => resp.json())
        .then(data => {
            this.props.addUserCourse(data)
            this.props.addCourseToAllCourses(data)
            // console.log(data.teacher)
            // this.props.setUserCourses(data)
            this.props.history.push('/courses')
        })
        }
        else{
            this.setState({
                errors: 'Subject Selection Required'
            })

            window.setTimeout(() => {
                this.setState({
                  errors: ''
                });
              }, 2000);
        }
    }
    render() {
        // console.log(this.props.currentUser.id)
        // console.log(this.state)
        return (
            <div className="ui container" style={newCourseFormStyle}>
                <br></br>
                <h1>New Course Form</h1>
                <form className="ui form" onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label>Course Name</label>
                        <input onChange={this.handleOnChange} style={{width: "80%"}} required type="text" name="name" placeholder="Course Name"/>
                        
                        <br></br>

                        <select onChange={this.handleOnChange} style={{width: "80%", margin: "auto"}} name="subject_id" className="ui fluid dropdown">
                            <option value="">Select Subject</option>
                            
                            {this.props.subjects.map(subject => {
                                return <option key={subject.id} value={subject.id}>{subject.name}</option>
                            })}
                        </select>

                        <br></br>

                        <button className="ui button" type="submit">Submit</button>
                    </div>
                </form>
                {
                    this.state.errors ? 
                    <div className="ui error message">
                        <div className="header">
                            Errors with your submission
                        </div>
                        <ul className="list">
                            <li>{this.state.errors}</li>
                        </ul>
                    </div>
                    :
                    null
                }
                
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        subjects: state.subjects,
        currentUser: state.currentUser
    }
}

function mapDispatchToProps(dispatch){
    return {
        addUserCourse: (newCourse) => {
            dispatch({type:"ADD_COURSE", payload: newCourse})
        },
        addCourseToAllCourses: (newCourse) => {
            dispatch({type: "ADD_COURSE_TO_ALL_COURSES", payload: newCourse})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCourseForm)
