const defaultState = {
    currentUser: {},
    // currentUserCourses: [],
    subjects: []
}

function reducer(state= defaultState, action){
    switch(action.type){
        case "SET_USER":
            return {...state, currentUser: action.payload}
        case "SET_USER_COURSES":
            // debugger
            return {...state, currentUserCourses: action.payload}
        case "ADD_COURSE":
            // return {...state, currentUserCourses: [...state.currentUserCourses, action.payload]}
            return {...state, currentUser: {...state.currentUser, courses: [...state.currentUser.courses, action.payload]}}
        case "REMOVE_COURSE":
            const courseRemoved = state.currentUser.courses.filter(course => {
                return course.id !== action.payload
            })
            return {...state, currentUser: {...state.currentUser, courses: courseRemoved}}
        case "SET_SUBJECTS":
            return {...state, subjects: action.payload}
        case "LOG_OUT":
            return {...state, currentUser: {}}
        default: 
            return state
    }
}

export default reducer