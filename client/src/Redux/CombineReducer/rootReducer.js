import {itemsReducer} from "../Reducer/itemsReducer";
import {combineReducers} from "redux";
import {formReducer} from "../Reducer/formReducer";

export const rootReducer = combineReducers({
    itemsReducer: itemsReducer,
    formReducer: formReducer,
})