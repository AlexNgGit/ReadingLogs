import {HIDEVIEW, SHOWVIEW} from "../String/detailedViewString";

export function detailedViewReducer(state = "", action) {
    switch (action.type) {
        case SHOWVIEW: return {
            state: action.payload
        }
        case HIDEVIEW: {
            return {
                state: ""
            }
        }
        default: return state
    }
}