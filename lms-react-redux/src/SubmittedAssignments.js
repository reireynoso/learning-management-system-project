import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import GradingComponent from './GradingComponent'
// import {Link} from 'react-router-dom'


const containerStyle = {
    border: "2px solid black",
    borderRadius: "20px",
    overflow: "hidden"
}


class SubmittedAssignments extends Component {

    state={
        currentSubmissionView: '',
        grade: 0
    }

    handleSubmitGrade = () => {
        let percentage_grade =  (this.state.grade / (this.props.currentAssignment.problems.length * 10)) * 100 //each answer is worth 10 points max
        fetch(`http://localhost:3000/api/v1/submissions/${this.state.currentSubmissionView}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                grade: percentage_grade
            })
        })
        .then(resp => resp.json())
        .then(data => {
            // console.log(data)
            this.props.updateSubmission(data)
            this.setState({
                currentSubmissionView: '',
                grade: 0
            })
            
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

    checkGradeColor = (grade) => {
        // adjust color of grade notification
        // debugger
        if(grade > 89 && grade <= 100){
            return {color: "green"}
        }
        else if (grade > 79 && grade <= 89){
            return {color: "blue"}
        }
        else if (grade > 69 && grade <= 79){
            return {color: "gold"}
        }
        else{
            return {color: "red"}
        }
    }
    
    render() {
        // console.log(this.props.location.pathname.split("/"))
        // console.log(this.props.currentAssignment)
        // console.log(this.state.grade)
        return (
            <div className="ui grid container" style={{marginTop: "10px"}}>
                <div className="six wide column">
                    <div style={containerStyle} className="ui container">
                        <div style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                            <h1 style={{margin: 0}}>Submitted Assignments</h1>
                            
                        </div>
                        {
                                Object.keys(this.props.currentAssignment).length !== 0 && this.props.currentAssignment.submissions.length !== 0 ?
                                this.props.currentAssignment.submissions.map(submission => {
                                    return <div key={submission.id} className="ui segment">
                                        <h4>From: {submission.student.first_name}</h4>
                                        
                                        <button className="ui yellow button" onClick={()=>{
                                            this.handleAssignmentClick(submission.id)
                                            }}>View</button>
                                        {
                                            submission.created_at !== submission.updated_at ?
                                            <Fragment>
                                                <h4>Grade Assigned: <span style={this.checkGradeColor(submission.grade_assigned)}>{submission.grade_assigned}</span> %</h4>
                                                {/* <h4>Percentage: {(submission.grade_assigned / (submission.answers.length * 10)) * 100} %</h4> */}
                                            </Fragment>
                    
                                            :
                                            null
                                        }
                                    </div>
                                })
                                :
                                <div className="ui segment">
                                    <h1>No submissions yet!</h1>
                                </div>
                            }
                    </div>
                </div>

                <div className="ten wide column">
                    <div style={containerStyle}>
                        <h1>Select a Submission to View</h1> 
                        {
                            this.state.currentSubmissionView ?
                            <Fragment>
                            <button onClick={this.handleSubmitGrade} className="ui green button">Submit Grade</button>
                            {
                                this.props.currentAssignment.submissions.map(submission => {
                                if(submission.id === this.state.currentSubmissionView){
                                   return <Fragment key={submission.id}>
                                       {/* <h1>{submission.assignment.due_date}</h1> */}
                                       {/* <h1>{submission.created_at}</h1> */}
                                       {
                                           submission.assignment.due_date > submission.created_at ?
                                           <h4 style={{color: "red"}}>ALERT: Late Submission</h4>
                                           :
                                        //    <h1>Not late</h1>
                                            null
                                       }
                                        {
                                            submission.answers.map(answer => {
                                                return <GradingComponent key={answer.id} addTallyToGrade={this.addTallyToGrade} answer={answer} currentAssignment={this.props.currentAssignment} submission = {submission}/>
                                                                
                                            })
                                        }
                                    </Fragment>
                                }
                                else{
                                    return null
                                }    
                            })
                            }
                            </Fragment> 
                            :
                            <Fragment>
                                 <iframe src="https://giphy.com/embed/xl3Biy7X0kRlzlQBx4" width="480" height="270" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/ramseysolutions-whatever-xl3Biy7X0kRlzlQBx4">via GIPHY</a></p>                          
                            </Fragment>
                           
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