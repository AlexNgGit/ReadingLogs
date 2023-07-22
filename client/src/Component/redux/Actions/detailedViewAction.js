import {HIDEVIEW, SHOWVIEW} from "../String/detailedViewString";

export function hideViewFunc () {
    return {
        type: HIDEVIEW
    }
}

export function showViewFunc (payload) {
    return {
        type: SHOWVIEW,
        payload: payload
    }
}