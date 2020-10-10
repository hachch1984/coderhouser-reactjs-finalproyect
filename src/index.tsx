import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "../src/styles/global.scss";
import "../src/styles/reset.scss";
import Routers from "./router/Routers";
import * as serviceWorker from "./serviceWorker";
import { StoreApp } from "./store/Stores";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={StoreApp}>
            <Routers />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
