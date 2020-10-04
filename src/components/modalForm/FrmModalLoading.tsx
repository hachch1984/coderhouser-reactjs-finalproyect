import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled, { CSSProperties } from "styled-components";

import { Gif_Loading1 } from "../../images/ImageCollection";
import FrmModal from "./FrmModal";
import { FrmModalLoading_ReduxAction_ShowModal } from "./Redux";

const FrmModalLoading = () => {

  const divCss: CSSProperties = {
    width: "400px",
    height: "400px",
    position: "absolute",
    left: "calc(50% - 200px)",
    top: "calc(50% - 200px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const imgCss: CSSProperties = {
    width: "200px",
    height: "200px",
  };

  const dispatch = useDispatch();



  return (
    <FrmModal>
      <div style={divCss}>
       {/* <img style={imgCss} src={Gif_Loading1}></img>*/}
        <h2 className="global-font-size-h1 text-white">Cargando</h2>
        
      </div>
    </FrmModal>
  );

};

export default FrmModalLoading;
