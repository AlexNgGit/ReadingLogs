import {itemsReducer} from "../Reducer/itemsReducer";
import {combineReducers} from "redux";
import {formReducer} from "../Reducer/formReducer";
import {detailedViewReducer} from "../Reducer/detailedViewReducer";
import {downloadReducer} from "../Reducer/downloadReducer";


export const rootReducer = combineReducers({
    downloadReducer: downloadReducer,
    detailedViewReducer: detailedViewReducer,
    itemsReducer: itemsReducer,
    formReducer: formReducer
})