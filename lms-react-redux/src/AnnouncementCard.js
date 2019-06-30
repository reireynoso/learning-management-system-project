// import React from 'react'
import {connect} from 'react-redux'
import React, { Component } from 'react'

class AnnouncementCard extends Component {
    handleOnClick = (id) =>{
        // console.log(id)
        fetch(`http://localhost:3000/api/v1/courses/${this.props.url}/announcements/${id}`,{
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(data => {
            // console.log(data) //returns json message of delete success
            this.props.removeAnnouncement(id);
        })
    }

    containsEmbed = (url) => {
        let splitString = url.split("/")
        if(splitString.includes('embed')){
            return true
        }
    }
    embedIt = (videoId) => {
        let splitString = videoId.split("=")
        // console.log(splitString[1])
        return `https://www.youtube.com/embed/${splitString[1]}`
    }

    
    render() {
        const {id, title, information, video_url} = this.props.announcement
        return (
        <div className="ui segment">
            <h1>{title}</h1>
            <p>{information}</p>
            {
                video_url ?
                <iframe width="560" height="315" src={this.embedIt(video_url)} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                :
                null
            }
           
            <div>
            <i onClick={()=> this.handleOnClick(id)} className="trash big alternate outline icon"></i>
            <i onClick={()=> this.props.handleEditClick(id)} className="edit big outline icon"></i>
            </div>
            
        </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        removeAnnouncement: (announcementId)=> {
            dispatch({type: "REMOVE_ANNOUNCEMENT", payload: announcementId})
        }
    }
}

export default connect(null, mapDispatchToProps)(AnnouncementCard)