import {DOWNLOADITEMS} from "../String/DownloadString";

export function downloadActions(payload) {
    return {
        type: DOWNLOADITEMS,
        payload: payload
    }
}