import {useDispatch, useSelector} from "react-redux";
import {downloadExcelResult} from "../../../../redux/Thunk/downloadExcelResult";

export function DownloadAnchor() {
    const dispatch = useDispatch()
    const downloadURL = String(useSelector((state)=>(state.downloadReducer)))
    function handleDeleteAll(e) {
        e.preventDefault()
        dispatch(downloadExcelResult())
    }

    return (
        <>
            <button
                className={"DownloadAll"}
                id={"DownloadAll"}
                onClick={(e)=>handleDeleteAll(e)}>Download Excel File</button>
        </>
    )
}