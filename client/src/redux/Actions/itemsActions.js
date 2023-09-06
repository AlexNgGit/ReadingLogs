import {ADD_ITEM, DELETE_ALL, DELETE_INDI} from "../String/itemsString"

export function addItem (obj) {
    return {
        type: ADD_ITEM,
        payload: obj
    }
}

export function deleteItem() {
    return {
        type: DELETE_ALL
    }
}

export function deleteAll() {
    return {
        type: DELETE_ALL
    }
}

export function deleteInditem(obj) {
    return {
        type: DELETE_INDI,
        payload: obj.ISBN
    }
}