import {MainDiv} from "./Components/mainDiv/MainDiv";
import "../Style/inventory.css"
import {useEffect} from "react";
import {SearchBar} from "./Components/Filter/FilterFrontEnd/Components/searchBar";

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

    return (
        <>
            <div>
                <SearchBar />
                <MainDiv />
            </div>
        </>
    )
}