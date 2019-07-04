import React, { Component,Fragment } from 'react'
import {connect} from 'react-redux'
import NewProblemsComponent from './NewProblemsComponent'
import SubmissionComponent from './SubmissionComponent'

class AssignmentProblemsComponent extends Component {
    render() {
        // console.log(this.props)
        const {id, due_date, name, note, problems} = this.props.assignmentObject
        return (
            <div>
                <h1>{name}</h1>
                {
                    Object.keys(this.props.currentUser).length !== 0 && this.props.currentUser.position === "teacher" ?
                    <NewProblemsComponent assignmentObject={this.props.assignmentObject}/>
                    
                    :
                    // <Fragment>
            
                    // <form className="ui tiny form">
                    //     <div className="field">
                    //         {/* <label>Information</label> */}
                    //         {problems.map(problem => {
                    //             return <div className="ui segment" key={problem.id}>
                    //                 <h2>Question: {problem.question}</h2>
                    //                 <textarea onChange={this.handleOnChange} name="information" placeholder="Solution" rows="2" ></textarea>
                    //             </div>
                    //         })}   
                    //     </div>
                    //     <input type="submit" value="Submit Assignment" className="ui submit button"></input>
                        
                    // </form>
                    // </Fragment>
                    <SubmissionComponent currentUser={this.props.currentUser} assignmentObject={this.props.assignmentObject}/>
                    
                }
                
                <br></br>
                {/* <br></br> */}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(AssignmentProblemsComponent)
