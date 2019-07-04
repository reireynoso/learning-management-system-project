import React, { Component,Fragment } from 'react'
import {connect} from 'react-redux'
import Moment from 'react-moment'
import {Link} from 'react-router-dom'


class Assignment extends Component {
    
    handleOnClick = (id) => {
        fetch(`http://localhost:3000/api/v1/courses/${this.props.url}/assignments/${id}`,{
            method: "DELETE"
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

    render() {
        console.log(this.props.assignment)
        let found = this.props.assignment.submissions.find(submission => {
            // debugger
            return submission.student_id === this.props.currentUser.id
        })
        // console.log(found)
    
        return (
            <div className="ui segment">
                <h3>{this.props.assignment.name}</h3>
                <h4>{this.props.assignment.note}</h4>
                <h4>Due: <Moment format="MM/DD/YYYY">{this.props.assignment.due_date}</Moment></h4>
                {/* <h1><Moment format="MM/DD/YYYY">{Date.now()}</Moment></h1>  */}
                {/* <h4>Due {<Moment fromNow>{this.props.assignment.due_date}</Moment>}</h4> */}
                {
                    Object.keys(this.props.currentUser).length !== 0 && this.props.currentUser.position === "teacher" ?
                    <Fragment>
                        <i onClick={() => this.handleOnClick(this.props.assignment.id)} className="trash big icon"></i> 
                        <i onClick={()=> this.props.handleAssignmentClick(this.props.assignment)}className="edit big icon"></i>  
                        <Link to={{pathname: `/courses/${this.props.assignment.course_id}/assignments/${this.props.assignment.id}/submissions`, assignmentObj: this.props.assignment}}>
                            <i className="folder open outline big icon"></i>
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
                                    <h4>Graded! Result: {this.checkIfSubmitted().grade_assigned}</h4>
                                }
                            </Fragment> 
                           
                            
                            :
                            <button onClick={() => this.props.handleAssignmentClick(this.props.assignment)} className="ui teal button">Start</button>
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
