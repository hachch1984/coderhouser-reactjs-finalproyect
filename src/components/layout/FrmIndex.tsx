import React from "react";
import { Link } from "react-router-dom";
import { CSSProperties } from "styled-components";
import { Img_LogoComplete } from "../../images/ImageCollection";
import Frm from "./Frm";
import { FrmListadoProducto_Url } from "../product/FrmListadoProducto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
 

const div1Css: CSSProperties = {
  position: "absolute",
  width: "350px",
  height: "350px",
  left: "calc(50% - 175px)",
  top: "calc(50% - 175px)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
};

const FrmIndex = () => {
  return (
    <Frm   className='global-background-color-orange'>

      <div style={div1Css}  className='global-background-color-orange' >
        <img src={Img_LogoComplete}></img>
        <Link  to={FrmListadoProducto_Url} className="mt-5 global-color-blue global-cursor-pointer global-font-size-h4">
          <FontAwesomeIcon icon={faSignInAlt}/> Ingresar
        </Link>
      </div>
      </Frm>
    
  );
};
export default FrmIndex;
export const FrmIndex_Url = "/";
