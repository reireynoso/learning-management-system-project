import './App.css';
import Login from './Login'
import SignUp from './SignUp'
import LandingPage from './LandingPage'
import React, { Component } from 'react'
import NavBar from './NavBar'
import { Switch, Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux'
import UserHomePage from './UserHomePage';
import CoursePage from './CoursePageContainer'
import CoursePageContainer from './CoursePageContainer';
import NewCourseForm from './NewCourseForm'
import RegisterCourseComponent from './RegisterCourseComponent'

class App extends Component {

  componentDidMount = () => {
    const token = localStorage.getItem("token")
    if(token){
      fetch("http://localhost:3000/api/v1/auto_login",{
      headers: {
        Authorization: token
      }
    })
    .then(resp => resp.json())
    .then(data => {
        // console.log(data)
        this.props.setUser(data)
        // this.props.setUserCourses(data.courses)
        
    })
    
    }
    fetch(`http://localhost:3000/api/v1/subjects`)
    .then(resp => resp.json())
    .then(data => this.props.setSubjects(data))

    fetch(`http://localhost:3000/api/v1/courses`)
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      this.props.setCourses(data)
    })
    
  }
    
    
  render() {
    return (
      <div className="App">
        <NavBar/>

        <Switch>
          <Route path="/home" component={LandingPage}/>
          <Route path='/login' component={Login}/>
          <Route path='/signUp' component={SignUp} /> 
          <Route path='/newCourseForm' component={NewCourseForm}/>
          <Route path='/registerCourse' component={RegisterCourseComponent}/>
          <Route name='announcement'path='/courses/:id/announcements' component={CoursePageContainer}/>
          <Route path='/courses/:id' component={CoursePageContainer}/>
          <Route path='/courses' component={UserHomePage} />
          <Route path='/' component={UserHomePage} />
          <Route render={() => <Redirect to = "/home"/>}/>
        </Switch>
        
    </div>
    )
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch){
  return {
      setUser: (userObj) => {
        dispatch({type:"SET_USER", payload: userObj})
      },
      // setUserCourses: (coursesArray) => {
      //   dispatch({type:"SET_USER_COURSES", payload: coursesArray})
      // },
      setSubjects: (subjectArray) => {
        dispatch({type: "SET_SUBJECTS", payload: subjectArray})
      },
      setCourses: (coursesArray) => {
        dispatch({type: "SET_ALL_COURSES", payload: coursesArray})
      }
  }
} 

export default connect(mapStateToProps,mapDispatchToProps)(App)