import {DisplayHeader} from "./DisplayHeader/DisplayHeader";
import {TransitioningButton} from "./DisplayHeader/TransitioningButton";
import DisplayPanel from "./DisplayPanel/DisplayPanel";

export function RightDiv() {
    return (
        <div id={"RightDiv"} >
            <DisplayHeader />
            <TransitioningButton />
            <DisplayPanel />
        </div>
    )
}