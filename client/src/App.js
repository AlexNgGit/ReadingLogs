import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Home} from "./Components/Home/Home";
import ErrorPage from "./Components/RouteError/RouteError";
import React, {useEffect} from "react";
import {RouteString} from "./RouteString/RouteString";
import {ExistingBooks} from "./Components/Event/LogBooks/FindBook/ExistingBook/ExistingBooks";
import {AddNewBook} from "./Components/Event/LogBooks/FindBook/AddNewBook/AddNewBook";
import {LogEvents} from "./Components/Event/LogEvents";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

export function App() {
    let url = "https://www.google.com/books/jsapi.js";

    function loadGoogleBook () {
        if (window.google.books.hasOwnProperty("load")) {
            window.google.books.load();
        }
    }

    useEffect(() =>{
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.onload = loadGoogleBook;
        document.getElementsByTagName( "head" )[0].appendChild( script );
        return () => {
            document.head.removeChild(script);
        };
    },[])


    const router = createBrowserRouter([
        {
            path: RouteString.home,
            element: <Home />,
            errorElement: <ErrorPage />,
        },
        {
            path: RouteString.logBook,
            element: <LogEvents />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: RouteString.existingBooks,
                    element: <ExistingBooks />
                },
                {
                    path: RouteString.addNewBooks,
                    element: <AddNewBook />
                }
            ]
        }
    ]);
    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <RouterProvider router={router} />
            </DndProvider>
        </>
    )
}