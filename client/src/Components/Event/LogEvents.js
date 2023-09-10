import {LogBooks} from "./LogBooks/FindBook/LogBooks";
import {MyCalendar} from "./Calendar/MyCalendar";
import TestCalendar from "./Calendar/TestCalendar";

export function LogEvents() {
    return (
        <>
            <div className={"LogBook"} id={"LogBookMain"}>
                <LogBooks />
                <TestCalendar />
            </div>
        </>
    )
}