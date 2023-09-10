import {useSelector} from "react-redux";
import {BookCard} from "./BookCards/BookCard";

export function ExistingBooks() {

    const booksCollection = useSelector(state=>state.itemsReducer);

    return (
        <>
            <div>
                {
                    booksCollection.map((element, index) =>{
                        return (
                            <BookCard refProp={element} key={index} />
                        );
                    })
                }
            </div>
        </>
    )
}