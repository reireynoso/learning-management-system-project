import React, { Component } from 'react'

class AssignmentProblemsComponent extends Component {
    render() {
        console.log(this.props.assignmentObject)
        const {id, due_date, name, note, problems} = this.props.assignmentObject
        return (
            <div>
                <h1>{name}</h1>
                <form onSubmit={this.handleOnSubmit} className="ui tiny form">
                    <div className="field">
                        {/* <label>Information</label> */}
                        {problems.map(problem => {
                            return <div className="ui segment" key={problem.id}>
                                <h2>Question: {problem.question}</h2>
                                <textarea onChange={this.handleOnChange} name="information" placeholder="Solution" rows="2" ></textarea>
                            </div>
                        })}   
                    </div>
                    <input type="submit" value="Submit Assignment" className="ui submit button"></input>
                    
                </form>
                <br></br>
                {/* <br></br> */}
            </div>
        )
    }
}

export default AssignmentProblemsComponent
