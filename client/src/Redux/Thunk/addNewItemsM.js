import {addItem} from "../Actions/itemsActions";

export function addNewItemsM(payload) {
    return async (dispatch, getState) => {
        try {
            console.log(payload)
            let response =  await fetch("http://localhost:8000/add/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    mode: "cors"
                },
                body: JSON.stringify(payload)
            })

            if (response.status === 200) {
                let retObj = await response.json();
                dispatch(addItem(retObj));
            }
        } catch (error) {
            console.log(error.message)
        }
    }
}