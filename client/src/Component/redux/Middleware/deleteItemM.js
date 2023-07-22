import {deleteInditem} from "../Actions/itemsActions";

export function deleteItemM(payload) {
    return async (dispatch, getState) => {
        try {
            let ISBN = payload.ISBN
            console.log(payload)
            let response = await fetch("https://alexcpsc455.onrender.com/delete/"+ISBN, {
                method: "DELETE",
            })
            if (response.status === 200) {
                dispatch(deleteInditem(payload));
            }
        } catch (error) {
            console.log(error.message)
        }
    }
}