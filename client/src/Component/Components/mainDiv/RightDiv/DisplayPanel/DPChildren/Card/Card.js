import {GoogleBookPreviewButton} from "./CardFeatures/GoogleBookPreview/GoogleBookPreviewButton";
import {useState} from "react";
import {GoogleBookPreviewPanel} from "./CardFeatures/GoogleBookPreview/GoogleBookPreviewPanel";
import {DetailedView} from "./CardFeatures/DetailedView/DetailedView";
import {ShowViewButton} from "./CardFeatures/DetailedView/ShowViewButton";
import {DeleteIndiCardButton} from "./CardFeatures/DeleteIndiCard/DeleteIndiCardButton";

export function Card({refProp}) {
    const [preview, setPreview] = useState(false);
    const [detailPopUp, setdetailPopUp] = useState(false)
    return (
        <div className={"Card"}>
            <div id={"mainCard"}>
                <ShowViewButton prop={
                    {
                        obj: refProp,
                        setdetailPopUp: setdetailPopUp
                    }
                } />
                <img className={"CardImage"} id={"image"} src={refProp.imageLink}/>
                <p className={"CardPara"} id={"CardText"}>Title: {refProp.title}&#8203;</p>
                <p className={"CardPara"}>Author: {refProp.author}&#8203;</p>
                <p className={"CardPara"}>Quantity: {refProp.quantity}&#8203;</p>
                <p className={"CardPara"}>Description: {refProp.description}&#8203;</p>
                <p className={"CardPara"}>ISBN: {refProp.ISBN}&#8203;</p>
                <GoogleBookPreviewButton prop={
                    {
                        ISBN: refProp.ISBN,
                        setPreview: setPreview
                    }
                }/>
                <DeleteIndiCardButton prop={refProp}/>
            </div>
            {preview ? <GoogleBookPreviewPanel prop={
                {
                    ISBN: refProp.ISBN,
                    setPreview: setPreview
                }
            } />: null}
            {
                detailPopUp? <DetailedView prop={setdetailPopUp}/>: null
            }
        </div>
    )
}