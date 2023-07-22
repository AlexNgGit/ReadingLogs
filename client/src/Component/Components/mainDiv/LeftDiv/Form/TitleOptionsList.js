import {useSelector} from "react-redux";

export function TitleOptionsList() {
   const suggestedTitles = useSelector((state)=>
       state.formReducer)
    let result = [];
    if (suggestedTitles) {
        for (let items of suggestedTitles) {
            result.push(Object.keys(items)[0])
        }
    }
    let id = 0;
    return (
        <>
            <datalist id="titleList" key={"titleList"}>
                {result.map(child=> {
                    id++
                    return <option value={child} key={id}/>
                })}
            </datalist>
        </>
    )
}
