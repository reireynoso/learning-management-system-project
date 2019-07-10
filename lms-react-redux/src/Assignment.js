import React, { Component,Fragment } from 'react'
import {connect} from 'react-redux'
import Moment from 'react-moment'
import {Link} from 'react-router-dom'
import {Confirm} from 'semantic-ui-react'

const lateStyle = {
    color: "red"
}
class Assignment extends Component {

    state = { open: false }

    show = () => this.setState({ open: true })
    handleConfirm = (id) => {
        this.handleOnClick(id)
        this.setState({ 
            open: false 
        })
    }
    handleCancel = () => this.setState({ open: false })
    
    handleOnClick = (id) => {
        const token = localStorage.getItem("token")
        fetch(`http://localhost:3000/api/v1/courses/${this.props.url}/assignments/${id}`,{
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
           }
        })
        .then(resp => resp.json())
        .then(data => {
            // console.log(data) //returns json message of delete success
            this.props.removeAssignment(id);
        })
        // this.props.removeAssignment(id);
    }

    handleEditClick = (assignmentClicked) => {
        // console.log(assignmentClicked)
        this.props.handleProblemClick(assignmentClicked)
    } 

    checkIfSubmitted = () => {
        let found = this.props.assignment.submissions.find(submission => {
            return submission.student_id === this.props.currentUser.id
        })
        return found
    }

    dateToday = () => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 
        today = yyyy + '-' + mm + '-' + dd
        
        return today 
    }

    checkGradeColor = (grade) => {
        // adjust color of grade notification
        // debugger
        if(grade > 89 && grade <= 100){
            return "green"
        }
        else if (grade > 79 && grade <= 89){
            return "blue"
        }
        else if (grade > 69 && grade <= 79){
            return "gold"
        }
        else{
            return "red"
        }
    }

    render() {
        // console.log(this.props.assignment)
        // let found = this.props.assignment.submissions.find(submission => {
        //     // debugger
        //     return submission.student_id === this.props.currentUser.id
        // })
        // console.log(found)
    
        return (
            <div className="ui segment">
                <h3>{this.props.assignment.name}</h3>
                <h4>{this.props.assignment.note}</h4>
                {/* checks if assignment is late, displaying the text as red */}
                <h4>Due: <Moment style={this.props.assignment.due_date < this.dateToday() ? lateStyle : null} format="MM/DD/YYYY">{this.props.assignment.due_date}</Moment></h4>
                {/* <h1><Moment format="MM/DD/YYYY">{Date.now()}</Moment></h1>  */}
                {/* <h4>Due {<Moment fromNow>{this.props.assignment.due_date}</Moment>}</h4> */}
                {
                    Object.keys(this.props.currentUser).length !== 0 && this.props.currentUser.position === "teacher" ?
                    <Fragment>
                        <span data-tooltip="Delete Assignment" data-position="top left">
                            <i onClick={this.show} className="trash red big icon"></i> 
                            <Confirm
                                open={this.state.open}
                                header='Deleting this assignment.'
                                onCancel={this.handleCancel}
                                onConfirm={() => this.handleConfirm(this.props.assignment.id)}
                                />
                        </span>
                        
                        <span data-tooltip="Add Questions to Assignment" data-position="top left">
                            <i onClick={()=> this.props.handleAssignmentClick(this.props.assignment)}className="edit violet big icon"></i>   
                        </span>
                        <Link style={{color: 'black'}} to={{pathname: `/courses/${this.props.assignment.course_id}/assignments/${this.props.assignment.id}/submissions`, assignmentObj: this.props.assignment}}>
                            <span data-tooltip="View Submissions" data-position="top left"> 
                                <i className="folder orange open outline big icon"></i>
                            </span>
                        </Link>
                        
                    </Fragment>
                          
                    :
                    <Fragment>
                        {
                            this.checkIfSubmitted() ?
                            <Fragment>
                                 <button className="ui disabled red button">Submitted</button>
                                 {this.checkIfSubmitted().created_at === this.checkIfSubmitted().updated_at ? 
                                    <h4>Grade Pending</h4> 
                                    :
                                    <Fragment>
                                    <h4>Graded! Result: </h4>
                                        {/* <span style={this.checkGradeColor(this.checkIfSubmitted().grade_assigned)}>{this.checkIfSubmitted().grade_assigned}</span>%</h4> */}
                                    <div className="ui indicating progress stats" data-percent={this.checkIfSubmitted().grade_assigned} >
                                        <div className="bar" style={{width: `${this.checkIfSubmitted().grade_assigned}%`, backgroundColor: this.checkGradeColor(this.checkIfSubmitted().grade_assigned)}}>
                                            <div className="progress" >{this.checkIfSubmitted().grade_assigned}%</div>
                                        </div>
                                    </div>
                                    </Fragment>
                                }
                            </Fragment> 
                           
                            
                            :
                            this.props.assignment.problems.length !== 0 ?
                            <button onClick={() => this.props.handleAssignmentClick(this.props.assignment)} className="ui teal button">Start</button>
                            :
                            <button className="ui teal disabled button">No Problems Assigned</button>
                        }
                    </Fragment>
                    // <button onClick={() => this.props.handleAssignmentClick(this.props.assignment)} className="ui teal button">Start</button>
                }
                
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
    return{
        removeAssignment:(id)=> {
            dispatch({type:"REMOVE_ASSIGNMENT_FROM_COURSE", payload:id})
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Assignment)
