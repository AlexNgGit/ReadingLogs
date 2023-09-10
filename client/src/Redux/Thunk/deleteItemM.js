import {deleteInditem} from "../Actions/itemsActions";
export function deleteItemM(payload) {
    return async (dispatch, getState) => {
        try {
            let ISBN = payload
            console.log(payload)
            let response = await fetch("http://localhost:8000/delete/"+ISBN,
                {
                method: "DELETE",
                }
            )
            if (response.status === 200) {
                dispatch(deleteInditem(payload));
            }
        } catch (error) {
            console.log(error.message)
        }
    }
}