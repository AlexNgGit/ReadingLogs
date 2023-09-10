import { configureStore } from '@reduxjs/toolkit'
import {rootReducer} from "../CombineReducer/rootReducer";
import thunk from "redux-thunk";


export const mainStore = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        }).concat(thunk),
})