import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

function NavBar(props) {
    // console.log(props.currentUser)
    return (
            <div className="pusher">
                <div className="ui inverted vertical masthead center aligned segment">
                    <div className="ui container" style={{height:"12vh"}}>
                        <div className="ui large secondary inverted pointing menu">
                            {/* <a className="toc item">
                                <i className="sidebar icon"></i>
                            </a> */}
                            <div className="active item"><Link to = "/home">Home</Link></div>
                            <div className="item">About</div>
                            {/* <div className="item">View Courses</div> */}
                            <div className="right item">
                                {
                                    Object.keys(props.currentUser).length !== 0 ? //checking to see if object is empty
                                    <React.Fragment>
                                        <Link to="/newCourseForm">
                                        <i className="big plus square outline icon"></i>
                                        </Link>     
                                        <Link to="/home">
                                            <div onClick={props.logOutUser} className="ui inverted button">Log Out</div>
                                        </Link>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <Link to="/login">
                                            <div className="ui inverted button">Log in</div>
                                        </Link>
                                        <Link to="/signUp">
                                            <div className="ui inverted button">Sign Up</div>
                                        </Link>
                                    </React.Fragment>     
                                }
                            </div>
                        </div>
                        <div>
                            {
                                Object.keys(props.currentUser).length !== 0 ?
                                <h1>Hello, {props.currentUser.first_name}!</h1>
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
            </div>
    )
}

function mapStateToProps(state){
    // console.log(state)
    return {
        currentUser: state.currentUser
    }
}

function mapDispatchToProps(dispatch){
    return{
        logOutUser: () => {
            localStorage.clear();
            dispatch({type: "LOG_OUT"})
        } 
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBar)