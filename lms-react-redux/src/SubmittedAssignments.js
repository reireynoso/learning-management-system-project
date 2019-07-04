import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import GradingComponent from './GradingComponent'
// import {Link} from 'react-router-dom'


const containerStyle = {
    border: "2px solid black"
}

class SubmittedAssignments extends Component {

    state={
        currentSubmissionView: '',
        grade: 0
    }

    handleSubmitGrade = () => {
        fetch(`http://localhost:3000/api/v1/submissions/${this.state.currentSubmissionView}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                grade: this.state.grade
            })
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            this.setState({
                currentSubmissionView: ''
            })
            this.props.updateSubmission(data)
        })
    }

    addTallyToGrade = (num) => {
        this.setState({
            grade: this.state.grade + num
        })
    }
    
    componentDidMount = () => {
        const course_id = this.props.location.pathname.split("/")[2]
        const assignment_id = this.props.location.pathname.split("/")[4]
        fetch(`http://localhost:3000/api/v1/courses/${course_id}/assignments/${assignment_id}`)
        .then(resp => resp.json())
        .then(data => this.props.setAssignment(data))
    }

    handleAssignmentClick = (id) => {
        // console.log(id)
        this.setState({
            currentView: id
        })
        if(id === this.state.currentSubmissionView){
            this.setState({
                currentSubmissionView: ''
            })
        }
        else{
            this.setState({
                currentSubmissionView: id
            })
        } 
    }
    
    render() {
        // console.log(this.props.location.pathname.split("/"))
        // console.log(this.props.currentAssignment)
        console.log(this.state.grade)
        return (
            <div className="ui grid container" style={{marginTop: "10px"}}>
                <div className="six wide column">
                    <div style={containerStyle} className="ui container">
                        <div style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                            <h1 style={{margin: 0}}>Submitted Assignments</h1>
                            
                        </div>
                        {
                                Object.keys(this.props.currentAssignment).length !== 0 ?
                                this.props.currentAssignment.submissions.map(submission => {
                                    return <div key={submission.id} className="ui segment">
                                        <h4>{submission.student.first_name}</h4>
                                        
                                        <button onClick={()=>{
                                            this.handleAssignmentClick(submission.id)
                                            }}>View</button>
                                        {
                                            submission.created_at !== submission.updated_at ?
                                            <h4>Already Graded</h4>
                                            :
                                            null
                                        }
                                    </div>
                                })
                                :
                                null
                            }
                    </div>
                </div>

                <div className="ten wide column">
                    <div style={containerStyle}>
                        <h1>Assignment Grading View</h1>
                        {
                            this.state.currentSubmissionView ?
                            <Fragment>
                            <button onClick={this.handleSubmitGrade} className="ui button">Submit Grade</button>
                            {
                                this.props.currentAssignment.submissions.map(submission => {
                                if(submission.id === this.state.currentSubmissionView){
                                    return submission.answers.map(answer => {
                                        return <GradingComponent key={answer.id} addTallyToGrade={this.addTallyToGrade}answer={answer} currentAssignment={this.props.currentAssignment} submission = {submission}/>
                                                        
                                    })
                                    
                                }
                                else{
                                    return null
                                }    
                            })
                            }
                            </Fragment>
                            
                            
                            :
                            <h1>Select a Submission to View</h1>                            
                        }    
                        
                    </div>
                    
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        currentAssignment: state.currentAssignment
    }
}

function mapDispatchToProps(dispatch){
    return{
        setAssignment:(assignmentObj)=> {
            dispatch({type:"SET_ASSIGNMENT", payload: assignmentObj})
        },
        updateSubmission: (submissionObj)=> {
            dispatch({type: "UPDATE_SUBMISSION_IN_CURRENT_ASSIGNMENT", payload: submissionObj})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmittedAssignments)