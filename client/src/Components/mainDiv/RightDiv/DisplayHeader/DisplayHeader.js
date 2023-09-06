import {useSelector} from "react-redux";

export function DisplayHeader() {
    const currStat = useSelector((state)=> state.itemsReducer);
   return (
       <>
           <div className={"DisplayHeader"}>
               <p>Total items: {currStat.inventory.totalItems}</p>
               <p>Page: {currStat.displayStatus.currPageIdx}/{currStat.inventory.maxPage}</p>
               <p>Shown Items: {currStat.displayStatus.currPageIdx}-{currStat.displayStatus.currPageIdx*3}</p>
           </div>
       </>
   )
}