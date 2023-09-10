import {DeleteIndiCardButton} from "./CardFeatures/DeleteIndiCard/DeleteIndiCardButton";
import "./BookCardStyle.scss"
import {useDrag} from "react-dnd";

export function BookCard({refProp}) {
    const [{ isDragging }, drag] = useDrag({
        type: 'CARD',
        item: refProp
    });



    return (
        <div className={"Card"} >
            <div className={"InfoPanel"} >
                <img className={"CardImage"} id={"image"} src={refProp.imageLink}
                     draggable={true}
                     width={50} />
                <p className={"CardPara"} id={"CardText"}>Title: {refProp.title}&#8203;</p>
                <p className={"CardPara"} id={"CardText"}>Author: {refProp.author}&#8203;</p>
            </div>
           <div id={"DetailedView"}>
               <p className={"CardPara"} id={"CardText"}>Title: {refProp.title}</p>
               <p className={"CardPara"} id={"CardText"}>Author: {refProp.author}</p>
               <p className={"CardPara"} id={"CardText"}>Title: {refProp.description}</p>
               <p className={"CardPara"} id={"CardText"}>Author: {refProp.ISBN}</p>
           </div>
            <div className={"ButtonPanel"}>
                <DeleteIndiCardButton  prop={refProp} />
            </div>
        </div>
    )
}