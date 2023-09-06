import {FindBook} from "./FindBook/FindBook";

export function LogBooks() {
    return (
        <>
            <div className={"LogBook"} id={"LogBookMain"}>
                <FindBook />
            </div>
        </>
    )
}