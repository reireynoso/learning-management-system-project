import React, { Component } from 'react'
import {connect} from 'react-redux'

class EditAnnouncementForm extends Component {

    state = {
        title: this.props.announcement.title,
        video_url: this.props.announcement.video_url,
        information: this.props.announcement.information,
        course_id: this.props.url,
        id: this.props.announcement.id
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        
    }

    handleOnSubmit = (e) => {
        const token = localStorage.getItem("token")
        e.preventDefault();
        fetch(`https://lms-api-rails.herokuapp.com/api/v1/courses/${this.props.url}/announcements/${this.state.id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                announcement: this.state
            })
        })
        .then(resp => resp.json())
        .then(data => {
            // console.log(data)
            this.props.editAnnnouncement(data)
            this.props.handleEditClick('')
            // this.props.addAnnnouncement(data)
        })
        // console.log(this.state)
        
        // this.props.editAnnnouncement(this.state)
        // this.props.handleEditClick('')
    }
    render() {
        // console.log(this.props)
        // console.log(this.props.announcement)
        // console.log(this.state)
        return (
            <div className="ui segment">
                <form onSubmit={this.handleOnSubmit} className="ui tiny form">
                <div className="two fields">
                    <div className="field">
                    {/* <label>First Name</label> */}
                    <input onChange={this.handleOnChange} value ={this.state.title} placeholder="Title" type="text" name="title"/>
                    </div>
                    <div className="field">
                    {/* <label>Last Name</label> */}
                    <input onChange={this.handleOnChange} value ={this.state.video_url} placeholder="Video URL" type="text" name="video_url"/>
                    </div>
                </div>
                <div className="field">
                     {/* <label>Information</label> */}
                     <textarea onChange={this.handleOnChange} value ={this.state.information} name="information" placeholder="Information" rows="2" ></textarea>
                 </div>
                <input type="submit" value="Edit Announcement" className="ui submit button"></input>
            </form>
            </div>
            
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        editAnnnouncement: (announcementObj)=> {
            dispatch({type: "EDIT_ANNOUNCEMENT", payload: announcementObj})
        }
    }
}

export default connect(null, mapDispatchToProps)(EditAnnouncementForm)
