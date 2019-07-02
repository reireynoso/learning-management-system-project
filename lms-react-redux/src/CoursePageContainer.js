import React, { Component,Fragment} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import AnnouncementCard from './AnnouncementCard'
import Assignment from './Assignment'
import NewAnnouncementForm from './NewAnnouncementForm'
import EditAnnouncementForm from './EditAnnouncementForm'
import AssignmentProblemComponent from './AssignmentProblemsComponent'
import NewProblemsComponent from './NewProblemsComponent'

const containerStyle = {
    border: "2px solid black"
}
class CoursePageContainer extends Component {
    // currentPath = this.props.history.location.pathname
    //once here. a separate fetch MUST be made to course model.
    state = {
        editAssignmentId: '',
        assignmentObject: {},
        currentView: ''
    }

    handleAssignmentClick = (assignment) => {
        // console.log(assignment)
        if(this.state.currentView === "assignments" && assignment.id === this.state.assignmentObject.id){
            this.setState({
                currentView: ''
            })
        }
        else{
            this.setState({
                assignmentObject: assignment,
                currentView: 'assignments'
            })
        } 
    }
    url = this.props.history.location.pathname.split("/")
    componentDidMount = () => {
        // const token = localStorage.getItem("token")
        // let url = this.props.history.location.pathname.split("/")
        // console.log(url[url.length-1])
        fetch(`http://localhost:3000/api/v1/courses/${this.url[this.url.length-1]}`, {
            
        })
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
        // console.log(this.props.currentUser)
        // let url = this.props.history.location.pathname.split("/")
        // console.log(url[url.length-1])
        // console.log(this.state.assignmentObject)
        return (
            <div className="ui grid container" style={{marginTop: "10px"}}>
                <div className="six wide column">
                    <div style={containerStyle} className="ui container">
                        <div style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                            <h1 style={{margin: 0}}>Assignments</h1>
                            {
                                Object.keys(this.props.currentUser).length !== 0 && this.props.currentUser.position === "teacher" ?
                                <Link to= {`${this.props.location.pathname}/assignments/new`}>
                                    <i className="plus big square icon"></i>
                                </Link>
                                :
                                null
                            }
                     
                        </div>
                        {/* <h1>Assignments</h1> */}
                        {
                            this.props.course.assignments !== undefined ?
                            // null
                            this.props.course.assignments.map(assignment => {
                                    return <Assignment handleProblemClick={this.handleProblemClick} handleAssignmentClick={this.handleAssignmentClick} handleEditClick={this.handleEditClick} key={assignment.id} url={this.url[this.url.length-1]} assignment={assignment}/>
                            })
                            :
                            null
                        }
                    </div>
                </div>

                <div className="ten wide column">
                    <div style={containerStyle}>
                  
                    {this.state.currentView ? 
                    
                    <AssignmentProblemComponent assignmentObject={this.state.assignmentObject}/> 
                    :
                    <Fragment> 
                        <h1>Announcements</h1>
                        {
                            //renders announcements
                            //checks if currentUser is defined and also if the user is a teacher
                            Object.keys(this.props.currentUser).length !== 0 && this.props.currentUser.position === "teacher" ? 
                            <NewAnnouncementForm url={this.url[this.url.length-1]}/>
                            :
                            null
                        }
                        
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
                        </Fragment>
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
        course: state.currentCourse,
        currentUser: state.currentUser
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