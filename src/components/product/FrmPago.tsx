import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Stores";
import FrmHeaderBodyFooter from "../layout/FrmHeaderBodyFooter";
import CmpProductCard from "./CmpProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faDollarSign } from "@fortawesome/free-solid-svg-icons";

const FrmPago: React.FC = (props) => {
  const state = useSelector((obj: RootState) => obj.NotaDePedido);

  return (
    <FrmHeaderBodyFooter
      hideShoppingIcon={true}
      hideTextBox={true}
      showContinueShopping={true}
    >
      <div className="container ">
        <div className="row">
          <div className="col-12  col-md-6 order-1 order-md-0">
            <div className=" container  ">
              <div className="row   ">
                {state.arrNotaDePedido.map((obj) => (
                  <CmpProductCard
                    key={obj.objProduct.id}
                    defaultOrientation="horizontal"
                    objProduct={obj.objProduct}
                    showRemoveButton={true}
                    showTotalSelectedItems={true}
                    alwaysCol12={true}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6  order-0 order-md-1">
            <div className="card mt-1 global-background-color-orange">
              <div className="card-body   d-flex flex-column justify-content-center align-items-center  mx-4 ">
                <p className='my-3 global-font-size-h5 global-color-blue'>Total a Pagar</p>
                <p className='my-3 global-font-size-h4 global-color-blue'>                 
                  <FontAwesomeIcon icon={faDollarSign} className="mr-1" />  {state.arrNotaDePedido.map(obj=>obj.cantidad*obj.objProduct.price).reduce((a,b)=>a+b,0) }
                </p>
                <button className="btn btn-primary my-3 px-5">
                  <FontAwesomeIcon icon={faCreditCard} className="mr-3" /> Pagar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FrmHeaderBodyFooter>
  );
};

export default FrmPago;
export const FrmPago_Url = "/pago";
