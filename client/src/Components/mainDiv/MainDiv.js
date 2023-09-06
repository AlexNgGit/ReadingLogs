import {RightDiv} from "./RightDiv/RightDiv";
import {LeftDiv} from "./LeftDiv/LeftDiv";
export function MainDiv({prop}) {
    return (
        <div id={"MainDiv"}>
            <LeftDiv  />
            <RightDiv />
        </div>
    )
}