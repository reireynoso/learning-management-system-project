const defaultState = {
    currentUser: {},
    // currentUserCourses: [],
    subjects: [],
    currentCourse: {}
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
        case "SET_COURSE":
            return {...state, currentCourse : action.payload}
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