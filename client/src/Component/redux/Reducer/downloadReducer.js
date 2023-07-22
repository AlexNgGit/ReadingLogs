import {DOWNLOADITEMS, initialDownloadURL} from "../String/DownloadString";

export function downloadReducer(state = initialDownloadURL, action) {
    switch (action.type) {
        case DOWNLOADITEMS: return action.payload
        default: return state
    }
}
