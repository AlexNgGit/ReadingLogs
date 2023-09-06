import {BUTTONUPDATE} from "../String/buttonString";
export function buttonUpdateFunc(payload) {
    return {
        type: BUTTONUPDATE,
        payload: payload
    }
}

