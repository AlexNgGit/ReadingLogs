import {useDispatch} from "react-redux";
import {deleteItem} from "../../../../redux/Actions/itemsActions";

export function DeleteAllButton() {
    const dispatch = useDispatch()

    function handleDeleteAll(e) {
        e.preventDefault()
        dispatch(deleteItem())
    }

    return (
        <>
            <button
                className={"DeleteAllButton"}
                id={"Delete All inventory"}
                onClick={(e)=>handleDeleteAll(e)}>Delete All Inventory</button>
        </>
    )
}