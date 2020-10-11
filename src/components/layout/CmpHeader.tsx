import {
    faInfoCircle,
    faList,
    faShoppingCart
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IItem } from "../../entities/IItem";
import {
    Category_ReduxAction_SetSelected,
    Item_ReduxAction_Add
} from "../../entities/Redux";
import { getFirestore } from "../../firebase";
import { Img_LogoCompleteHorizontal } from "../../images/ImageCollection";
import { RootState } from "../../store/Stores";
import { FrmModalLoading_ReduxAction_ShowModal } from "../modalForm/Redux";
import { FrmItemList_Url } from "../item/FrmItemList";
import { FrmPago_Url } from "../item/FrmPago";
import { FrmIndex_Url } from "./FrmIndex";

const CmpHeader: React.FC<{
    hideTextBox?: boolean;
    hideShoppingIcon?: boolean;
    showContinueShopping?: boolean;
}> = (props) => {
    const state = useSelector((obj: RootState) => obj.Entity);
    const dispatch = useDispatch();
    const className1 = " d-flex align-items-center   ";

    const cbSelectOnChange = async (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        try {
            dispatch(FrmModalLoading_ReduxAction_ShowModal(true));
            dispatch(Item_ReduxAction_Add([]));
            dispatch(Category_ReduxAction_SetSelected(event.target.value));
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
    };

    return (
        <div className="global-background-color-yellow  ">
            <div className="container  ">
                <div className="row ">
                    <div className="col py-3 d-flex flex-column flex-lg-row align-items-center  justify-content-between ">
                        <Link to={FrmIndex_Url}>
                            <img
                                alt="logo"
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
                                    className1 +
                                    "w-100 flex-lg-grow-1 mx-3 my-3 my-lg-0"
                                }
                            >
                                <div
                                    style={{
                                        backgroundColor: "white",
                                        borderRadius: "20px",
                                    }}
                                    className="p-2 flex-grow-1 d-flex align-items-center"
                                >
                                    <FontAwesomeIcon
                                        color="lightgray"
                                        icon={faInfoCircle}
                                    />
                                    <select
                                        value={state.selectedCategoryId}
                                        onChange={cbSelectOnChange}
                                        className="ml-2 w-100 global-background-color-white"
                                        style={{
                                            border: "solid 1px transparent",
                                        }}
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
                                className={
                                    className1 + "global-cursor-pointer "
                                }
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
                                to={FrmItemList_Url}
                                className={
                                    className1 + "global-cursor-pointer ml-2"
                                }
                            >
                                <FontAwesomeIcon
                                    className="global-color-blue"
                                    icon={faList}
                                />

                                <p
                                    className=" pl-1  my-3 my-lg-0  global-color-blue text-center "
                                    style={{ width: "150px" }}
                                >
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
