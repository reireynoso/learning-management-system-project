const defaultState = {
    currentUser: {},
    // currentUserCourses: [],
    subjects: [],
    allCourses: [],
    currentCourse: {},
    currentAssignment: {}
}

function reducer(state= defaultState, action){
    switch(action.type){
        case "SET_USER":
            return {...state, currentUser: action.payload}
        case "ADD_COURSE":
            // return {...state, currentUserCourses: [...state.currentUserCourses, action.payload]}
            return {...state, currentUser: {...state.currentUser, courses: [...state.currentUser.courses, action.payload]}}
        case "REMOVE_COURSE":
            const courseRemoved = state.currentUser.courses.filter(course => {
                return course.id !== action.payload
            })
            // console.log(courseRemoved)
            return {...state, currentUser: {...state.currentUser, courses: courseRemoved}}
            // const courseRemoved = state.currentUserCourses.filter(course => {
            //     return course.id !== action.payload
            // })
            // return {...state, currentUserCourses: courseRemoved}
        case "SET_SUBJECTS":
            return {...state, subjects: action.payload}
        case "SET_ALL_COURSES":
            // debugger
            return {...state, allCourses: action.payload}
        case "SET_ASSIGNMENT":
            // return {...state, currentUserCourses: [...state.currentUserCourses, action.payload]}
            return {...state, currentAssignment: action.payload}
        case "UPDATE_SUBMISSION_IN_CURRENT_ASSIGNMENT":
                const updateSubmissions = state.currentAssignment.submissions.map(submission => {
                    // debugger
                    if(submission.id === action.payload.id){
                        
                        submission = action.payload
                        return submission
                    }
                    else {
                        return submission
                    }
                })
                // debugger
                return {...state, currentAssignment: {...state.currentAssignment, submissions: updateSubmissions}}
        case "ADD_COURSE_TO_ALL_COURSES":
            return {...state, allCourses: [...state.allCourses, action.payload]}
        case "REMOVE_COURSE_FROM_ALL_COURSES":
            const courseRemovedAll = state.allCourses.filter(course => {
                return course.id !== action.payload
            })
            // debugger
            return {...state, allCourses: courseRemovedAll}
        case "ADD_ASSIGNMENT_TO_COURSE":
                return {...state, currentCourse : {...state.currentCourse, assignments: [...state.currentCourse.assignments, action.payload]}}
        case "REMOVE_ASSIGNMENT_FROM_COURSE":
                const assignmentRemoved = state.currentCourse.assignments.filter(assignment => {
                    return assignment.id !== action.payload
                })
                // console.log(assignmentRemoved)
            return {...state, currentCourse : {...state.currentCourse, assignments: assignmentRemoved}}
        case "ADD_PROBLEM_TO_ASSIGNMENT":
            // console.log(state.currentCourse)
            // console.log(action.payload)
            const matchAssignment = state.currentCourse.assignments.map(assignment => {
                // debugger
                if(assignment.id === action.payload.assignmentId){
                    
                    assignment.problems = [...assignment.problems, action.payload.question]
                    return assignment
                }
                else{
                    return assignment
                }
            })
            return {...state, currentCourse : {...state.currentCourse, assignments: matchAssignment}}
        case "SET_COURSE":
            return {...state, currentCourse : action.payload}
        // case "SUBMIT_ASSIGNMENT_TO_COURSE":
        //     // debugger
        //     const submitted = state.currentCourse.assignments.map(assignment => {
        //         if(assignment.id === action.payload.assignment.id){
        //             assignment.submissions = [...assignment.submissions, action.payload]
        //             return assignment
        //         }
        //         else{
        //             return assignment
        //         }
        //     })
        //     // debugger
        //     return {...state, currentCourse : {...state.currentCourse, assignments: submitted}}

        case "ADD_ANNOUNCEMENT":
            return {...state, currentCourse : {...state.currentCourse, announcements: [...state.currentCourse.announcements, action.payload]}}
        case "EDIT_ANNOUNCEMENT":
            const updatedAnnouncements = state.currentCourse.announcements.map(announcement => {
                if(announcement.id === action.payload.id){
                    announcement.title = action.payload.title
                    announcement.information = action.payload.information
                    announcement.video_url = action.payload.video_url
                    return announcement
                }
                else{
                    return announcement
                }
                
            })
            // debugger
            return {...state, currentCourse : {...state.currentCourse, announcements: updatedAnnouncements}}
            
        case "REMOVE_ANNOUNCEMENT":
            const announcementRemoved = state.currentCourse.announcements.filter(announcement => {
                return announcement.id !== action.payload
            })
            return {...state, currentCourse : {...state.currentCourse, announcements: announcementRemoved}}
        case "LOG_OUT":
            return {...state, currentUser: {}}
        default: 
            return state
    }
}

export default reducer