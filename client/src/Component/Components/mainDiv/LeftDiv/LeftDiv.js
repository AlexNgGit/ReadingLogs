import {InputForm} from "./Form/FormInput";
import {DeleteAllButton} from "./Form/DeleteAllButton";
import {DownloadAnchor} from "./Form/DownloadAnchor";

export function LeftDiv() {
    return (
        <div id={"LeftDiv"}>
            <InputForm />
            <DownloadAnchor />
        </div>
    )
}