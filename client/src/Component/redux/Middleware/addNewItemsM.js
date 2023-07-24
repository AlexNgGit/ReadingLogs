import {addItem} from "../Actions/itemsActions";

export function addNewItemsM(payload) {
    return async (dispatch, getState) => {
        try {
            console.log(payload)
            let response =  await fetch("https://bookinv.onrender.com/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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