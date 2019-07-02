import React, { Component } from 'react'
import {connect} from 'react-redux'
import Moment from 'react-moment'


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

    render() {
        console.log(this.props.assignment.problems)
    
        return (
            <div className="ui segment">
                <h3>{this.props.assignment.name}</h3>
                <h4>{this.props.assignment.note}</h4>
                {/* <h4>Due: <Moment format="MM/DD/YYYY">{this.props.assignment.due_date}</Moment></h4> */}
                {/* <h1><Moment format="MM/DD/YYYY">{Date.now()}</Moment></h1>  */}
                {/* <h4>Due {<Moment fromNow>{this.props.assignment.due_date}</Moment>}</h4> */}
                {
                    Object.keys(this.props.currentUser).length !== 0 && this.props.currentUser.position === "teacher" ?
                    <i onClick={() => this.handleOnClick(this.props.assignment.id)} className="trash big icon"></i>          
                    :
                    <button onClick={() => this.props.handleAssignmentClick(this.props.assignment)} className="ui teal button">Start</button>
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
