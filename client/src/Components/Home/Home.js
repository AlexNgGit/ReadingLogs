import {RouteString} from "../../RouteString/RouteString";
import {Link} from "react-router-dom";

export function Home() {
    return(
        <>
            <div>
                Home!
                <Link to={RouteString.logBook}>Log Books</Link>
            </div>
        </>
    )
}