import {useEffect, useRef} from "react";

export function GoogleBookPreviewPanel({prop}) {
    let currCanvas = useRef();
    let apiFlag = true;

    function handleOnClick(e) {
        e.preventDefault();
        prop.setPreview(false);
    }

    function failAlert() {
        return alert("Book is not available to load");
    }

    function successAlert() {
        return alert("Book is successfully loaded");
    }

    function enableViewer() {
        if (apiFlag) {
            console.log("line 20")
            currCanvas.current.innerHTML = "";
            currCanvas.current.style.width = "600px";
            currCanvas.current.style.height = "700px"
            let child = document.createTextNode('');
            currCanvas.current.appendChild(child)
            let viewer =  new window.google.books.DefaultViewer(currCanvas.current);
            let dynamicaRet = "ISBN:"+String(prop.ISBN);
            viewer.load(dynamicaRet, failAlert, successAlert)
        }
    }

    useEffect(()=>{
        enableViewer();
        return (()=>{
            apiFlag = false;
        })
    }, [])

    return (
        <div id={"GBPPanel"}>
            <button id={"ClosePreviewButton"}
                    onClick={(e)=>handleOnClick(e)}
            >Close Preview</button>
            <div ref={currCanvas} id={"canvasViewer"} />
        </div>
    )
}