import {addItem, deleteAll} from "../Actions/itemsActions";

export function filterItem(payload) {
    return async (dispatch, getState) => {
        const state = getState();
        try {
            console.log(payload)
            let response =  await fetch("https://bookinv.onrender.com/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            })

            if (response.status === 200) {
                let retObj = await response.json();
                dispatch(deleteAll())
                for (let items of retObj) {
                    dispatch(addItem(items))
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    }
}