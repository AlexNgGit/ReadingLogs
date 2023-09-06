import {Link, Outlet} from "react-router-dom";
import {RouteString} from "../../../RouteString/RouteString";

export function FindBook() {
    return (
        <div>
            <div>
                Find Book
            </div>
            <div>
                <Link to={RouteString.existingBooks}>Existing Books</Link>
                <Link to={RouteString.addNewBooks}>Add New Books</Link>
                <Outlet />
            </div>
        </div>
    )
}