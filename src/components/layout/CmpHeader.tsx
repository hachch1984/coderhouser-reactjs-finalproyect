import React from "react";

import { Img_LogoCompleteHorizontal } from "../../images/ImageCollection";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart,faList } from "@fortawesome/free-solid-svg-icons"; 
import { Link } from "react-router-dom";
import { FrmListadoProducto_Url } from "../product/FrmListadoProducto"; 
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Stores";
import { FrmPago_Url } from "../product/FrmPago";
import { FrmIndex_Url } from "./FrmIndex";

const CmpHeader: React.FC<{
  hideTextBox?: boolean;
  hideShoppingIcon?: boolean;
  showContinueShopping?:boolean;
}> = (props) => {
  const stateNotaDePedido = useSelector((obj: RootState) => obj.NotaDePedido);
  const dispatch = useDispatch();
  const className1 = " d-flex align-items-center   ";

  return (
    <div className="global-background-color-yellow  ">
      <div className="container  ">
        <div className="row ">
          <div className="col py-3 d-flex flex-column flex-lg-row align-items-center  justify-content-between ">
            <Link to={FrmIndex_Url}>
              <img
                height="150"
                width="150"
                className="img-fluid d-block global-cursor-pointer"
                src={Img_LogoCompleteHorizontal}
              ></img>
            </Link>
            {!props.hideTextBox && (
              <div
                className={
                  className1 + "w-100 flex-lg-grow-1 mx-3 my-3 my-lg-0"
                }
              >
                <div
                  style={{ backgroundColor: "white", borderRadius: "10px" }}
                  className="p-2 flex-grow-1 d-flex"
                >
                  <FontAwesomeIcon color="lightgray" icon={faSearch} />
                  <input
                    style={{ border: "none" }}
                    className="ml-2 w-100 "
                    type="text"
                    placeholder="Buscar producto"
                    max={50}
                  ></input>
                </div>
              </div>
            )}
            {!props.hideShoppingIcon && (
              <Link
                to={FrmPago_Url}
                className={className1 + "global-cursor-pointer "}
              >
                <FontAwesomeIcon
                className='global-color-blue'                
                  icon={faShoppingCart}
                />

                <p className="pb-3 pl-1  global-font-size-7  global-color-blue">
                  {stateNotaDePedido.arrNotaDePedido
                    .map((obj) => obj.cantidad)
                    .reduce((a, b) => a + b, 0)}
                </p>
              </Link>
            )}
                {props.showContinueShopping && (
              <Link
                to={FrmListadoProducto_Url}
                className={className1 + "global-cursor-pointer "}
              >
                <FontAwesomeIcon
                className='global-color-blue'                
                  icon={faList}
                />

                <p className=" pl-1  my-3 my-lg-0  global-color-blue">
                  Seguir Comprando
                </p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CmpHeader;
