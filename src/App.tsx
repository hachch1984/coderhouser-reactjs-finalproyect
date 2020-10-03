import React from "react";
 
 import "bootstrap/dist/css/bootstrap.css";
import "../src/styles/reset.scss";
import '../src/styles/global.scss';
 

import FrmModalLoading from "./components/modalForm/FrmModalLoading";
import FrmIndex from "./components/layout/FrmIndex";
import CmpHeader from "./components/layout/CmpHeader";
import CmpFooter from "./components/layout/CmpFooter";

//https://fontawesome.com/v4.7.0/icons/

function App() {
  return (
    <div className="App">

<CmpHeader></CmpHeader>

 <CmpFooter></CmpFooter>
  {/*  
  <FrmIndex></FrmIndex>
  <FrmIndex></FrmIndex>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ul>
            <li>ad</li>
            <li>ad</li>
          </ul>
          Learn React
        </a>
  </header>*/}
    </div>

  );
}

export default App;
