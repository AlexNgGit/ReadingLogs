import {Card} from "../Card/Card";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {addItem} from "../../../../../../redux/Actions/itemsActions";

export function Page() {
    let currPage = useSelector((state) => state);
    const dispatch = useDispatch()
    let flag = false
    currPage =
        JSON.parse(currPage.itemsReducer.
            inventory.PageCollection[currPage.itemsReducer.displayStatus.currPageIdx - 1]).childCard
    async function getInitialData () {
            let response = await fetch("https://alexcpsc455.onrender.com/", {
                method: "GET"
            })
            let result = await response.json()
            for (let items of result) {
                dispatch(addItem(items))
            }
    }

    useEffect( ()=>{
        if (flag) return;
        async function fetchData() {
            const response = await getInitialData();
        }
        fetchData()
        return(()=>{
            flag = true;
        });

    }, [])


    return (
           <div className={"DisplayPanel"}>
               {currPage.map(child=>{
                   return <Card refProp={child} key={child.ISBN}/>
               })}
           </div>
    )
}
