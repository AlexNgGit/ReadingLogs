import {ADD_ITEM, DELETE_INDI, initialState} from "../String/itemsString";

export const itemsReducer = (state = initialState, action) => {

    switch(action.type) {
        case ADD_ITEM: {
            return [
                ...state,
                action.payload
            ]
        }

        case DELETE_INDI: {
            let ISBN = action.payload.ISBN;
            let matchedBook = state.filter(element => element.ISBN === ISBN);
            let deleteBookIndex = state.indexOf(matchedBook[0]);

            return [
                ...state.slice(0, deleteBookIndex),
                ...state.slice(deleteBookIndex + 1, state.length)
            ]
        }
        default: return state;
    }
}