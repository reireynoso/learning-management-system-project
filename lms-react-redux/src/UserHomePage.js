import React from 'react'
import {connect} from 'react-redux'
import CourseContainer from './CourseContainer'

function UserHomePage(props) {
    // console.log(props.currentUserCourses)
    // console.log(props.currentUser.courses)
    return (
        <div>
            {
                props.currentUser.position === 'teacher' ?

                <h1>Classes You Are Teaching</h1>
                :
                <h1>Classes You Are Enrolled In</h1>
            }
            <CourseContainer courses={props.currentUser.courses}/>
            {/* <CourseContainer courses={props.currentUserCourses}/> */}
        </div>
    )
}

function mapStateToProps(state){
    // console.log(state)
    return {
        currentUser: state.currentUser,
        // currentUserCourses: state.currentUserCourses
    }
}

function mapDispatchToProps(dispatch){
    return{
        // logOutUser: () => {
        //     localStorage.clear();
        //     dispatch({type: "LOG_OUT"})
        // } 
    }
}
export default connect(mapStateToProps)(UserHomePage)
