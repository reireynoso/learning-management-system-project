import React, { Component } from 'react'
import {withRouter} from 'react-router'

class SubmissionComponent extends Component {
    state = {
        date_submitted: '',
        grade_assigned: 0,
        // assignment_id: this.props.assignmentObject.id,
        // assignment_id: '',
        student_id: this.props.currentUser.id,
        
    }
    handleSubmissionSubmit = (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")
            // console.log(this.props.history.location.pathname)
            // this.props.addAssignment(this.state)
            fetch(`http://localhost:3000/api/v1/submissions`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    submission: {...this.state, assignment_id: this.props.assignmentObject.id}
                })
            })
            .then(resp => resp.json())
            .then(data => {            
            //  console.log(data)  
            this.props.history.push('/courses')
            })
            // this.props.setSubmission(this.state) 
    }
    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const {problems} = this.props.assignmentObject
        // console.log(this.props.history)
        return (
            <div>
                <form onSubmit={this.handleSubmissionSubmit} className="ui tiny form">
                        <div className="field">
                            {/* <label>Information</label> */}
                            {problems.map(problem => {
                                return <div className="ui segment" key={problem.id}>
                                    <h2>Question: {problem.question}</h2>
                                    
                                    <textarea onChange={this.handleOnChange} required name={`answer${problems.indexOf(problem) + 1}`} placeholder="Solution" rows="2"></textarea>
                                </div>
                            })}   
                        </div>
                        <input type="submit" value="Submit Assignment" className="ui submit button"></input>
                    </form>
            </div>
        )
    }
}

// function mapDispatchToProps(dispatch){
//     return {
//         setSubmission: (submissionObj)=> {
//             dispatch({type: "SUBMIT_ASSIGNMENT_TO_COURSE", payload: submissionObj})
//         }
//     }
// }

export default withRouter(SubmissionComponent)