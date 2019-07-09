import React, { Component } from 'react'

export default class GradingComponent extends Component {
    state = {
        errorMessage: ''
    }

    handleAssignPointClick = (e) => {
        const {question, answer, points_assigned, id, problem_id, submission_id,student_id} = this.props.answer
        // if(this.state.points_assigned >= 0 && this.state.points_assigned <= 10){
        if(e.target.value >= 0 && e.target.value <= 10){
            fetch(`http://localhost:3000/api/v1/answers/${this.props.answer.id}`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    // points_assigned: this.state.points_assigned
                    points_assigned: e.target.value
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
        console.log(e.target.value)
        // this.setState({
        //     [e.target.name]: e.target.value
        // })
    }


    render() {
        const {question, answer, points_assigned} = this.props.answer
        // console.log(this.props.answer)
        return (
           
            <div className="ui segment">
                <h1>Question: {question}</h1>
                <p>Answer: {answer}</p>
                {
                    this.state.errorMessage ?
                    <h3>{this.state.errorMessage}</h3>
                    :
                    null
                }
                {/* <input type="number" required style={{width: "50%"}} placeholder="Assign Points" name="points_assigned" onChange={this.handleOnChange} ></input> */}
                {/* <select className="ui search dropdown" name="points_assigned" onChange={this.handleOnChange}> */}
                <select className="ui search dropdown" name="points_assigned" onChange={this.handleAssignPointClick}>
                    <option value="">Points</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                {/* <input onClick={this.handleAssignPointClick} value="Assign Points" className="ui submit button"></input> */}
                {/* <button onClick={this.handleAssignPointClick} className="ui teal button">Assign Points</button> */}
         
            </div>
           
        )
    }
}
