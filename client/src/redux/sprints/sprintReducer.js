import {
    SPRINT_FETCH_REQUEST,
    SPRINT_FETCH_FAILURE,
    FETCH_SPRINT_LIST_SUCCESS,
    UPDATE_SPRINT_FOR_TASK_SUCCESS,
    DELETE_SPRINT_SUCCESS,
    CREATE_SPRINT_SUCCESS
} from './sprintType.js'

const initialSprintState = {
    loading: false,
    sprints: [],
    error: '',
    success: false,
    message: ''
}


const sprintReducer = (state = initialSprintState, action) => {
    const bluePrintSuccessObj = {
        ...state,
        loading: false,
        success: true,
        error: '',
        sprints: [],
        message: action.payload.message
    }

    switch(action.type) {
        case SPRINT_FETCH_REQUEST:
            return {
                ...state,
                loading: true,
                success: false
            }
        case SPRINT_FETCH_FAILURE:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.payload.error,
                message: action.payload.message
            }
        case FETCH_SPRINT_LIST_SUCCESS:
            bluePrintSuccessObj.sprints = action.payload.sprints
            return bluePrintSuccessObj

        case UPDATE_SPRINT_FOR_TASK_SUCCESS:
            let sprints = state.sprints
            state.sprints.map((sprint, spInd) => {
                if (sprint._id === action.helper.sprintId) {
                    let tasks = sprint.tasks || []
                    if(tasks != []) {
                        sprint.tasks.map((task, taskInd) => {
                            if (task.id === action.payload.task.id) {
                                tasks[taskInd] = action.payload.task
                            }
                        })
                    }
                    sprints[spInd] = tasks
                }})
            bluePrintSuccessObj.sprints = sprints
            return bluePrintSuccessObj

        case DELETE_SPRINT_SUCCESS:
            let sprints = state.sprints
            state.sprints.map((sprint, ind) => {
                if (
                        sprint._id === action.helper.sprintId &&
                        sprint.sprintNumber === action.helper.sprintNumber 
                    ) {
                        sprints.splice(ind, 1)
                    }
            })
            bluePrintSuccessObj.sprints = sprints
            return bluePrintSuccessObj

        case CREATE_SPRINT_SUCCESS:
            let sprints = state.sprints
            sprints.push(action.payload.sprint)
            bluePrintSuccessObj.sprints = sprints
            return bluePrintSuccessObj

        case UPDATE_SPRINT_SUCCESS:
            let sprints = state.sprints
            const updatedSprint = action.payload.sprint
            
            state.sprints.map((sprint, index) => {
                if (
                        updatedSprint._id === sprint._id && 
                        updatedSprint.sprintNumber === sprint.sprintNumber
                    ) {
                        sprints[index] = updatedSprint
                    }
            })
            bluePrintSuccessObj.sprints = sprints
            return bluePrintSuccessObj

        default:
            return state
    }
    
}

export default sprintReducer