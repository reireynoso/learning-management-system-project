import React, { Component } from 'react'
import {connect} from 'react-redux'

class RegisterCourseComponent extends Component {
    state = {
        searchTerm: '',
        selectedSubject: ''
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    format = (courses) => {
        return this.filtration(courses)
    }

    filtration = (courses) => {
        return courses.filter(course => {
            // debugger
            return course.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
        })
    }

    handleSubjectClick = (name) => {
        this.setState({
            selectedSubject: name
        })
    }

    handleRegisterClick = (course_id) => {
        console.log(course_id)
        // console.log(this.state)
        
        fetch(`http://localhost:3000/api/v1/students/${this.props.url}/enrollments`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                enrollment: {
                    course_id: course_id,
                    student_id: this.props.currentUser.id
                }
            })
        })
        .then(resp => resp.json())
        .then(data => {
            // console.log(data)
            // console.log(data)
            this.props.addUserCourse(data.course)
            this.props.history.push('/courses')
        })
    }
    foundMatchMethod = (courseInput) => {
        //handles match for course registration. if match is found, changes text and className of Course Card
        let foundMatch;
        if(this.props.currentUser.courses !== undefined){
            foundMatch = this.props.currentUser.courses.find(course => {
                return course.id === courseInput.id
            })
        }
        return foundMatch
    }
    handleClassName = (courseInput) => {
        
        if(this.foundMatchMethod(courseInput)){
            return "ui red disabled button"
        }
        else{
            return "ui green button"
        }
    }
    handleText = (courseInput) => {
        if(this.foundMatchMethod(courseInput)){
            return "Already Registered"
        }
        else{
            return "Register"
        }
    }
    render() {
        // console.log(this.props.currentUser.courses)
        // console.log(this.props.allCourses)
        return (
        <div className="ui container">
                <br></br>
                <div style={{marginBottom: "20px", display: "flex", justifyContent:"center", justifyContent:"space-between"}}>
                <div className="ui icon input">
                    <input onChange={this.handleOnChange} name="searchTerm" type="text" placeholder="Search Course Name"/>
                    <i className="search icon"></i>
                </div>

                <div className="ui compact menu">
                    <div className="ui simple dropdown item">
                        Sort By Subject
                        <i className="dropdown icon"></i>
                        <div className="menu">
                        {this.props.subjects.map(subject => {
                            return <div key={subject.id} onClick={() => this.handleSubjectClick(subject.name)} className="item">{subject.name}</div>
                        })}
                        </div>
                    </div>
                </div>
                </div>
                
                <div className="ui three column grid">
                    {this.format(this.props.allCourses).map(course => {
                    if(course.subject.name.includes(this.state.selectedSubject)){ //checks if subject matches sort
                        return <div key={course.id} className="column">
                            <div className="ui segment">
                                <h1>{course.name}</h1>
                                <h3>{course.subject.name}</h3>
                                <h4>{`Instructor: ${course.teacher.first_name} ${course.teacher.last_name}`}</h4>
                                <br></br>
                        
                                <button onClick={() => this.handleRegisterClick(course.id)} className={this.handleClassName(course)}>{this.handleText(course)}</button>
                                
                            </div>
                        </div>
                    }
                    else {
                        return null
                    }   
                    })}
                </div>        
        </div>
        )
    }
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser,
        allCourses: state.allCourses,
        subjects: state.subjects,
    }
}

function mapDispatchToProps(dispatch){
    return {
        addUserCourse: (newCourse) => {
            dispatch({type:"ADD_COURSE", payload: newCourse})
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RegisterCourseComponent)
