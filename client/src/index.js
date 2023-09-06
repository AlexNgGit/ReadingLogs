import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from "./App";
import {Provider} from "react-redux";
import {mainStore} from "./redux/Store/mainStore";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={mainStore}>
            <App />
        </Provider>
    </React.StrictMode>
);
