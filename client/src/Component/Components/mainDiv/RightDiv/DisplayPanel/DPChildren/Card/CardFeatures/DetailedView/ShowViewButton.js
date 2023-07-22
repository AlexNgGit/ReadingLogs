import {useDispatch, useSelector} from "react-redux";
import {showViewFunc} from "../../../../../../../../redux/Actions/detailedViewAction";

export function ShowViewButton ({prop}) {

    const dispatch = useDispatch()

    function handleShowView (e) {
        e.preventDefault();
        dispatch(showViewFunc(JSON.stringify(prop.obj)));
        prop.setdetailPopUp(true)
    }

    return (
        <>
            <div>
                <button
                    onClick={(e)=>handleShowView(e)}
                >Show Detail</button>
            </div>
        </>
    )
}
