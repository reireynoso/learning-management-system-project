import React from 'react'
import {Link} from 'react-router-dom'
// import lifecycle from 'react-pure-lifecycle';
import {Animated} from 'react-animated-css'

function LandingPage() {

    return (
        
        <div>
            <div className="pusher">
                <div className="ui inverted vertical masthead center aligned segment">
                    <div className="ui text container" style={{height:"85vh"}}>
                            <Animated animationIn="fadeInLeft" animationInDuration={2000} animationOut="fadeOut" isVisible={true}>
                                <h1 className="ui inverted header">
                                    Manage teaching and learning with this Learning Management System.
                                </h1>
                            </Animated>
                            <br></br>
                            <Animated animationIn="fadeInRight" animationInDuration={2000} animationOut="fadeOut" isVisible={true}>
                                <h3>LMS helps connect teachers and students, boost collaboration, and share educational resources</h3>
                            </Animated>
                            <br></br>
                            <Animated animationInDelay={2000} animationOut="fadeOut" isVisible={true}>
                                <Link to="/courses">
                                    <div className="ui huge primary button">Go to Class <i className="right arrow icon"></i></div>
                                </Link>
                            </Animated>
                    </div>
                </div>
            </div>

            {/* <div className="ui inverted vertical footer segment">
                <div className="ui container" style={{height:"20vh"}}>
                    <div className="ui stackable inverted divided equal height stackable grid">
                        <div className="three wide column">
                            <h4 className="ui inverted header">About</h4>
                            <div className="ui inverted link list">
                            <a href="#" className="item">Sitemap</a>
                            <a href="#" className="item">Contact Us</a>
                            <a href="#" className="item">Religious Ceremonies</a>
                            <a href="#" className="item">Gazebo Plans</a>
                            </div>
                        </div>

                        <div className="three wide column">
                            <h4 className="ui inverted header">Services</h4>
                            <div className="ui inverted link list">
                            <a href="#" className="item">Banana Pre-Order</a>
                            <a href="#" className="item">DNA FAQ</a>
                            <a href="#" className="item">How To Access</a>
                            <a href="#" className="item">Favorite X-Men</a>
                            </div>
                        </div>
                        <div className="seven wide column">
                            <h4 className="ui inverted header">Footer Header</h4>
                            <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

// const methods = {
//     componentDidMount(){
//         window.location.reload();
//     }
// }

export default LandingPage
