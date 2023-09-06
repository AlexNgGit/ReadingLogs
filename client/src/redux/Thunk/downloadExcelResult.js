import {downloadActions} from "../Actions/downloadActions";

export function downloadExcelResult(payload) {
    return async (dispatch, getState) => {
        try {
            let response = await fetch("https://bookinv.onrender.com/download", {
                method: "PUT",
            });
            let blob = await response.blob();
            let urlLINK = URL.createObjectURL(blob);
            downloadAnchor(urlLINK)
            //dispatch(downloadActions(urlLINK))
        } catch (error) {
            console.log(error.message)
        }
    }
}

function downloadAnchor(urlLINK) {
    const anchor = document.createElement("a");
    anchor.href = urlLINK;
    anchor.download = "Result.xlsx";
    document.body.append(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    URL.revokeObjectURL(urlLINK)
}