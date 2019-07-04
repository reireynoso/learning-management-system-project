import React, { Component } from 'react'

export default class GradingComponent extends Component {
    state = {
        errorMessage: ''
    }

    handleAssignPointClick = () => {
        const {question, answer, points_assigned, id, problem_id, submission_id,student_id} = this.props.answer
        if(this.state.points_assigned >= 0 && this.state.points_assigned <= 10){
            fetch(`http://localhost:3000/api/v1/answers/${this.props.answer.id}`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    points_assigned: this.state.points_assigned
                })
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                this.props.addTallyToGrade(data.points_assigned)
            })
        }
        else{
            // alert('MUST BE LOW OR HIGH')
            this.setState({
                errorMessage: "Points must be between 0 and 10!"
            })

            window.setTimeout (() => {
                this.setState({
                  errorMessage: ''
                });
              }, 2000);
        }
    }

    

    handleOnChange = (e) => {
        // console.log(e)
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render() {
        const {question, answer, points_assigned} = this.props.answer
        // console.log(this.props.answer)
        return (
           
            <div className="ui segment">
                <h1>Question: {question}</h1>
                <p>Answer: {answer}</p>
                <p>Points: </p>
                {
                    this.state.errorMessage ?
                    <h3>{this.state.errorMessage}</h3>
                    :
                    null
                }
                <input type="number" required style={{width: "50%"}} placeholder="Assign Points" name="points_assigned" onChange={this.handleOnChange} ></input>
                {/* <input onClick={this.handleAssignPointClick} value="Assign Points" className="ui submit button"></input> */}
                <button onClick={this.handleAssignPointClick} className="ui button">Assign Points</button>
         
            </div>
           
        )
    }
}
