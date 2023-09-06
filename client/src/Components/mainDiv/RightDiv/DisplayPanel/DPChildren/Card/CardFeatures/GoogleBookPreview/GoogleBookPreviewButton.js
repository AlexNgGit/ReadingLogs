export function  GoogleBookPreviewButton({prop}) {

    function handleOnclick (e) {
        e.preventDefault();
        prop.setPreview(true)
    }


return (
    <>
        <label>Book Preview: </label>
        <button id={"GoogleBookPreview"}
                    onClick={(e)=> {
                        handleOnclick(e)
                    }}
            >
                <img src={"https://www.google.com/intl/en/googlebooks/images/gbs_preview_button1.png"}/>
        </button>
    </>
)
}