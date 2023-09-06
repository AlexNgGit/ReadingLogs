import {useDispatch, useSelector} from "react-redux";
import {buttonUpdateFunc} from "../../../../redux/Actions/buttonActions";

export function TransitioningButton({propTB}) {
    const dispatch = useDispatch()
    const prevStatus = useSelector(state=>state.itemsReducer.displayStatus).prevButtonStatus
    const nextStatus = useSelector(state=> state.itemsReducer.displayStatus).nextButtonStatus

    function nextOnclick() {
        dispatch(buttonUpdateFunc(1))
    }

    function  prevOnclick() {
        dispatch(buttonUpdateFunc(-1))
    }

    return (
        <>
            <div className={"TransitioningButton"}>
                <button id={"PrevButton"} disabled={prevStatus}
                        onClick={()=>{prevOnclick()}} >&laquo; Previous</button>
                <button id={"NextButton"} disabled={nextStatus}
                        onClick={()=>{nextOnclick()}}>Next &raquo;</button>
            </div>
        </>
    )
}