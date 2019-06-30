import React, { Component} from 'react'
import {connect} from 'react-redux'
import AnnouncementCard from './AnnouncementCard'
import NewAnnouncementForm from './NewAnnouncementForm'
import EditAnnouncementForm from './EditAnnouncementForm'

const containerStyle = {
    border: "2px solid black"
}
class CoursePageContainer extends Component {
    // currentPath = this.props.history.location.pathname
    //once here. a separate fetch MUST be made to course model.
    state = {
        editAssignmentId: ''
    }
    url = this.props.history.location.pathname.split("/")
    componentDidMount = () => {
        // let url = this.props.history.location.pathname.split("/")
        // console.log(url[url.length-1])
        fetch(`http://localhost:3000/api/v1/courses/${this.url[this.url.length-1]}`)
        .then(resp => resp.json())
        .then(data => {
            this.props.setCourse(data)
            // console.log(data.announcements)
        })
    }
    handleOnClick = (category) => {
        this.setState({
            currentView: category
        })
        this.renderView()
    }

    handleEditClick = (id) => {
        // console.log(id)
        this.setState({
            editAssignmentId: id
        })
    }
    render() {
        // console.log(this.props.currentUserCourses)
        // let url = this.props.history.location.pathname.split("/")
        // console.log(url[url.length-1])
        // console.log(this.props.course.announcements)
        return (
            <div className="ui grid container" style={{marginTop: "10px"}}>
                <div className="four wide column">
                    <div style={containerStyle} className="ui container">
                        <h1>Assignments</h1>
                        <div className="ui segment">
                             <h1>1</h1>
                        </div>
                        <div className="ui segment">
                             <h1>1</h1>
                        </div>
                    </div>
                </div>

                <div className="twelve wide column">
                    <div style={containerStyle}>
                        <h1>Announcements</h1>
                        <NewAnnouncementForm url={this.url[this.url.length-1]}/>
                        {
                            this.props.course.announcements !== undefined ?
                            // null
                            this.props.course.announcements.map(announcement => {
                                if (announcement.id === this.state.editAssignmentId){
                                    return <EditAnnouncementForm key={announcement.id} url={this.url[this.url.length-1]} handleEditClick={this.handleEditClick} announcement={announcement}/>
                                }
                                else{
                                    return <AnnouncementCard handleEditClick={this.handleEditClick} key={announcement.id} url={this.url[this.url.length-1]} announcement={announcement}/>
                                }
                                // return <AnnouncementCard key={announcement.id} url={this.url[this.url.length-1]} announcement={announcement}/>
                            })
                            :
                            null
                        }
                        
                    </div>
                </div>
            </div>
            // <div className="ui grid" style={{marginTop: "10px", height: '80vh'}}>
            //     <div className="three wide column">
            //         <div className="ui vertical fluid tabular menu">
                       
            //             <div onClick={() => this.handleOnClick('Announcements')} className="item">
            //                 Announcements
            //             </div>

            //             <div className="item">
            //                 Assignments
            //             </div>
            //         </div>
            //     </div>
            //     <div className="thirteen wide stretched column">
            //         {this.state.currentView === 'Announcements'? 
            //         <Fragment>
            //             <h1>Announcements</h1>
            //             <div className="ui segment">
            //                <h1>0</h1>
            //             </div>
            //             <div className="ui segment">
            //                 <h1>1</h1>
            //             </div>
            //             <div className="ui segment">
            //                 <h1>3</h1>
            //             </div>
            //             <div className="ui segment">
            //                <h1>0</h1>
            //             </div>
            //             <div className="ui segment">
            //                 <h1>1</h1>
            //             </div>
            //             <div className="ui segment">
            //                 <h1>3</h1>
            //             </div>
                        
            //         </Fragment>
            //         :
            //         <div className="ui segment">
            //             no
            //         </div>
            //     }
            //     </div>
            // </div>
        )
    }
}

function mapStateToProps(state){
    return{
        // currentUserCourses: state.currentUserCourses
        course: state.currentCourse
    }
}

function mapDispatchToProps(dispatch){
    return {
        setCourse: (courseObj)=> {
            dispatch({type: "SET_COURSE", payload: courseObj})
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CoursePageContainer)