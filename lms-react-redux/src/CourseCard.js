import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

function CourseCard(props) {
    // console.log(props.course.id)
    const token = localStorage.getItem("token")
    function handleOnClick(){
        // console.log(props.course.id)
        fetch(`http://localhost:3000/api/v1/teachers/${props.currentUser.id}/courses/${props.course.id}`,{
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(resp => resp.json())
        .then(data => {
            // console.log(data) //returns json message of delete success
            props.removeCourse(props.course.id)
            props.removeCourseFromAllCourse(props.course.id)
        })
    }
    function handleStudentClick(){
        const token = localStorage.getItem("token")
        // console.log(props.course)
        // console.log(props.currentUser)
        let currentEnrollment;
        fetch(`http://localhost:3000/api/v1/students/${props.currentUser.id}/enrollments`,{
            headers: {
                "Authorization": `Bearer ${token}`
           }
        })
        .then(resp => resp.json())
        .then(data => {
            // console.log(data)
            data.map(enrollment => {
                // debugger
                if(enrollment.course.id === props.course.id && enrollment.student.id === props.currentUser.id){
                    currentEnrollment = enrollment
                    // debugger
                }
            })
            removeClickedCourse(currentEnrollment.id)
        })
        // console.log(currentEnrollment)
  
    }

    function removeClickedCourse(id){
        const token = localStorage.getItem("token")
        fetch(`http://localhost:3000/api/v1/students/${props.currentUser.id}/enrollments/${id}`,{
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
           }

        })
        .then(resp => resp.json())
        .then(data => {
            // console.log(data) //returns json message of delete success
            props.removeCourse(props.course.id)
        })
    }
    return (
        <div className="column">
                <div className="ui segment course">
                    <p>{props.course.subject.name}</p>
                    <Link to={{
                        pathname: `/courses/${props.course.id}`,
                        courseProps: props.course
                        }}>
                        <h1>{props.course.name}</h1>
                    </Link>
                    <br></br>
                    {
                        props.currentUser.position === 'teacher' ? 
                        <span data-tooltip="Delete Course" data-position="bottom left">
                            <i onClick={handleOnClick} className="big trash icon"></i>
                        </span>
                         
                         :
                         <button onClick={handleStudentClick} className="ui red button">Drop Course</button>
                    }      
                </div>
        </div>
    )
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser
    }
}

function mapDispatchToProps(dispatch){
    return{
        removeCourse: (id) => {
            dispatch({type: "REMOVE_COURSE", payload: id})
        },
        removeCourseFromAllCourse: (id) => {
            dispatch({type:"REMOVE_COURSE_FROM_ALL_COURSES", payload:id})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CourseCard)
