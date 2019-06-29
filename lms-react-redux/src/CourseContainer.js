import React from 'react'
import CourseCard from './CourseCard'

export default function CourseContainer(props) {
    // console.log(props.courses === undefined)
    return (
    <div className="ui container" >
        {
            props.courses === undefined ?
            null
            :
            <div className="ui three column grid">
                {props.courses.map(course => {
                    return <CourseCard key={course.id} course={course}/>
                })}
            </div>
        }
        
    </div>
    )
}
