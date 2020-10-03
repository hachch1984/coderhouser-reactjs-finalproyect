import React from "react";
import Frm from "../layout/Frm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMeh } from "@fortawesome/free-solid-svg-icons";

const FrmNotFound = () => {
  return (
    <Frm className="d-flex  flex-column align-items-center justify-content-center px-5 global-background-color-orange text-white">
      <p className="global-font-size-h1 py-2">
        <FontAwesomeIcon className="global-font-size-h1 py-2" icon={faMeh} />{" "}
        404
      </p>
      <p className="global-font-size-h3 py-2 text-center">
        Pagina No Encontrada
      </p>
    </Frm>
  );
};

export default FrmNotFound;
export const FrmNotFound_Url = "/404";
