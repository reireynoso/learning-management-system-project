import React from 'react'
import {Animated} from 'react-animated-css'

export default function AboutComponent() {

    return (
        <div className="ui container" style={{marginTop: "10px"}}>
            {/* <img className="ui medium circular image" src="https://photos.spartan.com/races/4304/watermarked_previews/105573/Firejump/669NCD4S/DSC_6473.JPG"></img> */}
            <Animated animationIn="fadeInLeft" animationInDuration={2000} animationOut="fadeOut" isVisible={true}>
                <div className="ui segment" style={{backgroundColor: "black", borderRadius: "10px"}}>
                    <img style={{width: "100%", borderRadius: "10px", display:"block"}} src="https://www.fingent.com/blog/assets/uploads/2017/12/How-to-Select-the-Right-Responsive-Learning-Management-System-1024x439.png"></img>
                    <br></br>
                    <Animated animationInDelay={2000} animationOut="fadeOut" isVisible={true}>
                        <div style={{backgroundColor: "#F5F5F5", borderRadius: "10px"}}>
                            <h1 style={{fontSize: "2em"}}>This is LMS</h1>
                            <h4 style={{fontSize: "2em"}}>A platform for teachers and students to share knowledge and resources along with fostering communication and collaboration</h4>
                            
                            <ul style={{listStyle: "none"}}>
                                <li>Post, comment, and facilitate classroom discussions through announcements</li>
                                <li>Assign and grade assignments</li>
                                <li>Grades are organized through Polar and Bar Charts for students and teachers</li>
                                <li>Offer open-ended questions and responses to promote thinking skills</li>
                                <li>Keep materials and resources organied in the Course Page</li>
                            </ul>
                            
                        </div>
                    </Animated>
                </div>
            </Animated>
        </div>
    )
}
