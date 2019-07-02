import React, { Component } from 'react'
import {connect} from 'react-redux'

class NewProblemsComponent extends Component {
    state = {
        question: '',
        assignment_id: this.props.assignmentObject.id
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/api/v1/courses/${this.props.assignmentObject.course_id}/assignments/${this.props.assignmentObject.id}/problems`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                problem: this.state
            })
        })
        .then(resp => resp.json())
        .then(data => {
            // console.log(data)
            this.props.addProblemToAssignment(data, this.props.assignmentObject.id)
        })
    }
    render() {
        // console.log(this.props.currentCourse.assignments)
        const {id, due_date, name, note, problems} = this.props.assignmentObject
        return (
            <div>
                <form onSubmit={this.handleOnSubmit} className="ui tiny form">
                        <div className="field">
                            <input onChange={this.handleOnChange} placeholder="Question" type="text" name="question"/>
                        </div>
                        <input type="submit" value="Submit Assignment" className="ui submit button"></input>
                        
                    </form>
                    {/* {problems.map(problem => {
                        return <div className="ui segment" key={problem.id}>
                            <h2>Question: {problem.question}</h2>

                        </div>
                    })}    */}
                    {this.props.currentCourse.assignments.map(assignment => {
                        if(assignment.id === id){
                            return assignment.problems.map(problem => {
                                return <div className="ui segment" key={problem.id}>
                                    <h2>Question: {problem.question}</h2>

                                </div>
                            })  
                            // console.log(assignment.problems)
                            // return <h1>hello</h1>
                        }
                        else{
                            return null
                        }
                    })}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        currentCourse: state.currentCourse
    }
}

function mapDispatchToProps(dispatch){
    return {
        addProblemToAssignment:(questionObj, assignment_id)=> {
            dispatch({type:"ADD_PROBLEM_TO_ASSIGNMENT", payload:{question: questionObj, assignmentId: assignment_id}})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProblemsComponent)
