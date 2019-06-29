import React, { Component } from 'react'

export default class CoursePageContainer extends Component {

    render() {
        // console.log(this.props.match.params.id)
        return (
            <div className="ui grid container" style={{marginTop: "10px"}}>
                <div style={{border: "1px solid black" }} className="five wide column">
                    Assignments
                </div>

                <div style={{border: "1px solid black" }}  className="eleven wide column">
                    Announcements
                </div>
            </div>
        )
    }
}

