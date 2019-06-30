import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

function CourseCard(props) {
    // console.log(props.course.id)
    function handleOnClick(){
        // console.log(props.course.id)
        fetch(`http://localhost:3000/api/v1/teachers/${props.currentUser.id}/courses/${props.course.id}`,{
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(data => {
            // console.log(data) //returns json message of delete success
            props.removeCourse(props.course.id)
        })
    }
    return (
        <div className="column">
                <div className="ui segment">
                    <p>{props.course.subject.name}</p>
                    <Link to={{
                        pathname: `/courses/${props.course.id}`,
                        courseProps: props.course
                        }}>
                        <h1>{props.course.name}</h1>
                    </Link>
                    <br></br>
                    <i onClick={handleOnClick} className="big trash icon"></i>
                </div>
        </div>
    )
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser,
    }
}

function mapDispatchToProps(dispatch){
    return{
        removeCourse: (id) => {
            dispatch({type: "REMOVE_COURSE", payload: id})
        } 
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CourseCard)
