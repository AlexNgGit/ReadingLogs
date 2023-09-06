export function HideViewButton ({prop}) {
    function hideViewClick() {
        prop(false)
    }

    return (
        <>
            <button onClick={()=>hideViewClick()} id={"hideDetailed"}>Hide Detail</button>
        </>
    )
}
