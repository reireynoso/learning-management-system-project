import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

const newCourseFormStyle = {
    border: "2px solid black",
    height: "50vh",
    marginTop: "40px",
    width: "50vw",
    borderRadius: "20px"
}
class NewAssignmentForm extends Component {
    state = {
        name: '',
        note: '',
        course_id: this.props.history.location.pathname.split("/")[2],
        due_date: ''
    }

    handleSubmit = (e) => {
        e.preventDefault()
        // console.log(this.props.history.location.pathname)
        // this.props.addAssignment(this.state)
        fetch(`http://localhost:3000/api/v1/courses/${this.props.history.location.pathname.split("/")[2]}/assignments`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                assignment: this.state
            })
        })
        .then(resp => resp.json())
        .then(data => {
            
            this.props.history.push(`/courses/${this.props.history.location.pathname.split("/")[2]}`)
        })

        // this.props.history.push(`/courses/${this.props.history.location.pathname.split("/")[2]}`)
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        // console.log(this.props.history.location)
        // let currentCourse = this.props.history.location.pathname.split("/")[2]; //grabs current course id based on path name. ORDER of path is important
        // console.log(currentCourse)
        // console.log(this.state.course_id)
        // console.log(this.state.due_date)
        return (
            <div className="ui container" style={newCourseFormStyle}>
            <br></br>
            <h1>New Assignment Form</h1>
            <form className="ui form" onSubmit={this.handleSubmit}>
                <div className="field">
                    <label>Assignment Name</label>
                    <input onChange={this.handleOnChange} required style={{width: "80%"}} type="text" name="name" placeholder="Name"/>
                    
                    <label>Note</label>
                    <input onChange={this.handleOnChange} required style={{width: "80%"}} type="text" name="note" placeholder="Note"/>

                    <label>Due Date</label>
                    <input onChange={this.handleOnChange} required style={{width: "80%"}} type="date" name="due_date" placeholder="Date"/>
                    
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
        currentUser: state.currentUser
    }
}

function mapDispatchToProps(dispatch){
    return {
        addAssignment: (newAssignment) => {
          dispatch({type:"ADD_ASSIGNMENT_TO_COURSE", payload: newAssignment})
        },
        
    }
  } 

export default connect(mapStateToProps,mapDispatchToProps)(NewAssignmentForm)
