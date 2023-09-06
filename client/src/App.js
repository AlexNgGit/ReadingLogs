import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Home} from "./Components/Home/Home";
import ErrorPage from "./Components/RouteError/RouteError";
import React from "react";
import {RouteString} from "./RouteString/RouteString";
import {LogBooks} from "./Components/LogBooks/LogBooks";

export function App() {
    /*let url = "https://www.google.com/books/jsapi.js";

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
    },[])*/
    const router = createBrowserRouter([
        {
            path: RouteString.home,
            element: <Home />,
            errorElement: <ErrorPage />,
        },
        {
            path: RouteString.logBook,
            element: <LogBooks />,
            errorElement: <ErrorPage />
        }
    ]);
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}