import {SETDEFAULTFORMVALUE, initialFormState} from "../String/formString";

export function formReducer(state = initialFormState, action) {
    switch (action.type) {
        case SETDEFAULTFORMVALUE: return action.payload
        default: return state
    }
}

