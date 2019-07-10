import React from 'react'
import {connect} from 'react-redux'
import CourseContainer from './CourseContainer'
import {Link} from 'react-router-dom'
import {Animated} from 'react-animated-css'

function UserHomePage(props) {
    // console.log(props)
    // console.log(props.currentUser.courses)
    return (
        <div>
            <br></br>
            <Animated animationIn="fadeInRight" animationInDuration={2000} animationOut="fadeOut" isVisible={true}>
            {
                props.currentUser.position === 'teacher' ?

                <h1>Classes You're Teaching</h1>
                :
                <React.Fragment>
                    <Link to="/registerCourse">
                        <button className="ui blue button">Register for a Course</button>
                        
                    </Link>
                    <h1>Classes You Are Enrolled In</h1>
                </React.Fragment> 
            }
            </Animated>
            <br></br>
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

// function mapDispatchToProps(dispatch){
//     return{
//         // logOutUser: () => {
//         //     localStorage.clear();
//         //     dispatch({type: "LOG_OUT"})
//         // } 
//     }
// }
export default connect(mapStateToProps)(UserHomePage)
