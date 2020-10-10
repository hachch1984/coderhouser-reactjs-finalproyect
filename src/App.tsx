import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import "../src/styles/reset.scss";
import "../src/styles/global.scss";
import CmpFooter from "./components/layout/CmpFooter";
import CmpHeader from "./components/layout/CmpHeader";

//https://fontawesome.com/v4.7.0/icons/

function App() {
    return (
        <div className="App">
            <CmpHeader />
            <CmpFooter />
        </div>
    );
}

export default App;
