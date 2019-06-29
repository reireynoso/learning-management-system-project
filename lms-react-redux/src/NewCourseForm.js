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
        subject_id: ''
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            teacher_id: this.props.currentUser.id
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        // console.log(this.state)
        fetch(`http://localhost:3000/api/v1/teachers/${this.state.teacher_id}/courses`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                course: this.state
            })
        })
        .then(resp => resp.json())
        .then(data => {
            this.props.addUserCourse(data)
            // console.log(data.teacher)
            // this.props.setUserCourse(data)
            this.props.history.push('/courses')
        })
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
                        <input onChange={this.handleOnChange} style={{width: "80%"}} type="text" name="name" placeholder="Course Name"/>
                        
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCourseForm)
