import React, { Component } from 'react'
import {connect} from 'react-redux'

class NewAnnouncementForm extends Component {
    state = {
        title: '',
        video_url: '',
        information: '',
        course_id: this.props.url
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state)
        fetch(`http://localhost:3000/api/v1/courses/${this.props.url}/announcements`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                announcement: this.state
            })
        })
        .then(resp => resp.json())
        .then(data => {
            // console.log(data)
            this.props.addAnnnouncement(data)
        })
        e.target.reset()
    }
    render() {
        // console.log(this.props)
        return (
            <form onSubmit={this.handleOnSubmit} className="ui tiny form">
                <div className="two fields">
                    <div className="field">
                    {/* <label>First Name</label> */}
                    <input onChange={this.handleOnChange} required placeholder="Title" type="text" name="title"/>
                    </div>
                    <div className="field">
                    {/* <label>Last Name</label> */}
                    <input onChange={this.handleOnChange} placeholder="Video URL" type="text" name="video_url"/>
                    </div>
                </div>
                <div className="field">
                     {/* <label>Information</label> */}
                     <textarea onChange={this.handleOnChange} required name="information" placeholder="Information" rows="2" ></textarea>
                 </div>
                <input type="submit" value="Post New Announcement" className="ui submit green button"></input>
            </form>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        addAnnnouncement: (announcementObj)=> {
            dispatch({type: "ADD_ANNOUNCEMENT", payload: announcementObj})
        }
    }
}

export default connect(null, mapDispatchToProps)(NewAnnouncementForm)
