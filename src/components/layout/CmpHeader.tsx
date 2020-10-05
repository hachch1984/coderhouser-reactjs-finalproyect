import React, { useEffect, useState } from "react";
import { Img_LogoCompleteHorizontal } from "../../images/ImageCollection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faList,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FrmListadoProducto_Url } from "../product/FrmListadoProducto";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Stores";
import { FrmPago_Url } from "../product/FrmPago";
import { FrmIndex_Url } from "./FrmIndex";
import {
  Category_ReduxAction_Add,
  Category_ReduxAction_SetSelected,
  Item_ReduxAction_Add,
} from "../../entities/Redux";
import { getFirestore } from "../../firebase";
import { IItem } from "../../entities/IItem";
import { ICategory } from "../../entities/ICategory";
import { Console } from "console";
import { FrmModalLoading_ReduxAction_ShowModal } from "../modalForm/Redux";

const CmpHeader: React.FC<{
  hideTextBox?: boolean;
  hideShoppingIcon?: boolean;
  showContinueShopping?: boolean;
}> = (props) => {
  const state = useSelector((obj: RootState) => obj.Entity);
  const dispatch = useDispatch();
  const className1 = " d-flex align-items-center   ";

  useEffect(() => {}, []);

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

            <p className=" mx-3  mt-3 mt-lg-0 global-color-blue">
              {state.email}
            </p>
            {!props.hideTextBox && (
              <div
                className={
                  className1 + "w-100 flex-lg-grow-1 mx-3 my-3 my-lg-0"
                }
              >
                <div
                  style={{ backgroundColor: "white", borderRadius: "20px" }}
                  className="p-2 flex-grow-1 d-flex align-items-center"
                >
                  <FontAwesomeIcon color="lightgray" icon={faInfoCircle} />
                  <select
                    value={state.selectedCategoryId}
                    onChange={async (event) => {
                      try {
                        dispatch(FrmModalLoading_ReduxAction_ShowModal(true));
                        dispatch(Item_ReduxAction_Add([]));
                        dispatch(
                          Category_ReduxAction_SetSelected(event.target.value)
                        );
                        const db = getFirestore();

                        let arrItem: IItem[] = [];

                        let response: firebase.firestore.QuerySnapshot;

                        if (event.target.value === "ALL") {
                          response = await db.collection("items").get();
                        } else {
                          response = await db
                            .collection("items")
                            .where("categoryId", "==", event.target.value)
                            .get();
                        }

                        response.docs.forEach((doc) => {
                          let objItem = doc.data() as IItem;
                          objItem.id = doc.id;
                          arrItem.push(objItem);
                        });

                        dispatch(Item_ReduxAction_Add(arrItem));
                      } catch (ex) {
                        console.log("error", ex);
                      } finally {
                        dispatch(FrmModalLoading_ReduxAction_ShowModal(false));
                      }
                    }}
                    className="ml-2 w-100"
                    style={{ border: "solid 1px transparent" }}
                  >
                    {state.arrCategories?.map((obj) => (
                      <option key={obj.id} value={obj.id}>
                        {obj.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            {!props.hideShoppingIcon && (
              <Link
                to={FrmPago_Url}
                className={className1 + "global-cursor-pointer "}
              >
                <FontAwesomeIcon
                  className="global-color-blue"
                  icon={faShoppingCart}
                />

                <p className="pb-3 pl-1  global-font-size-7  global-color-blue">
                  {state.arrNotaDePedido
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
                <FontAwesomeIcon className="global-color-blue" icon={faList} />

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
