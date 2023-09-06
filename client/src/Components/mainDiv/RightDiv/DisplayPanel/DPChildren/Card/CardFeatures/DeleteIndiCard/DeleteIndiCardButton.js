import {useDispatch} from "react-redux";
import {deleteItemM} from "../../../../../../../../redux/Thunk/deleteItemM";

export function DeleteIndiCardButton({prop}) {
    const dispatch = useDispatch()
    function handleOnClick(e) {
        e.preventDefault();
        dispatch(deleteItemM(prop))
    }
    return (
        <button key={"DeleteCardButton"}
                onClick={(e)=>{handleOnClick(e)}}
        >Delete Card</button>
    )
}