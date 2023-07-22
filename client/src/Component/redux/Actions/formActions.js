import {SETDEFAULTFORMVALUE} from "../String/formString";

export function setDefaultInput(suggestedDic) {
    return {
        type: SETDEFAULTFORMVALUE,
        payload: suggestedDic
    }
}