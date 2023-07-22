import {useSelector} from "react-redux";
import {HideViewButton} from "./HideViewButton";
import Draggable from 'react-draggable';


export function DetailedView({prop}) {
    let viewedCard = JSON.parse(useSelector((state)=>state).detailedViewReducer.state);
    return (
        <>
            <Draggable>
            <div id={"DetailedView"}>
                <HideViewButton prop={prop}/>
                <div id={"viewPara"}>
                    <p id={"viewParaP"}>Title: {viewedCard.title}</p>
                    <p id={"viewParaP"}>Author: {viewedCard.author}</p>
                    <p id={"viewParaP"}>Quantity: {viewedCard.quantity}</p>
                    <p id={"viewParaP"}>ISBN: {viewedCard.ISBN}</p>
                </div>
            </div>
            </Draggable>
        </>
    )
}