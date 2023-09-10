import {addItem, deleteInditem} from "../Actions/itemsActions";

export function getAllBooks() {
    return async (dispatch, getState) => {
        let currentStorage = getState().itemsReducer;
        if (currentStorage.length !== 0) {
            for (let item of currentStorage) {
                dispatch(deleteInditem(item))
            }
        }
        try {
                let response = await fetch("http://localhost:8000/",
                    {
                    method: "GET"
                })
                let result = await response.json()
                for (let items of result) {
                    dispatch(addItem(items))
                }
        } catch (error) {
            console.log(error.message)
        }
    }
}