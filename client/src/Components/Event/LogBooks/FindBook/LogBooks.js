import {Outlet, useNavigate} from "react-router-dom";
import {RouteString} from "../../../../RouteString/RouteString";
import {useDispatch} from "react-redux";
import {getAllBooks} from "../../../../Redux/Thunk/getAllBooks";

export function LogBooks() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleExistingBooksLink = async (e) => {
        e.preventDefault();
        await dispatch(getAllBooks());
        navigate(RouteString.existingBooks);
    }

    const handleCreatingNewBooks = async (e) => {
        e.preventDefault();
        navigate(RouteString.addNewBooks);
    }


    return (
        <div>
            <div>
               <h2>Your Books</h2>
            </div>
            <div>
                <button
                    onClick={
                    async (e) =>
                    {
                        await handleExistingBooksLink(e);
                    }
                }>Existing Books</button>
                <button
                    onClick={
                        async (e) =>
                        {
                            await handleCreatingNewBooks(e);
                        }
                    }
                >Add New Books</button>
                <Outlet />
            </div>
        </div>
    )
}