import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { firestore } from "firebase";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { CSSProperties } from "styled-components";
import { ICategory } from "../../entities/ICategory";
import { IItem } from "../../entities/IItem";
import { INotaDePedido } from "../../entities/INotaDePedido";
import {
    Category_ReduxAction_Add,
    Item_ReduxAction_Add,
    NotaDePedido_ReduxAction_AddArray,
    Order_ReduxAction_SetEmail,
    Order_ReduxAction_SetUserId,
} from "../../entities/Redux";
import { getFirestore } from "../../firebase";
import { Img_LogoComplete } from "../../images/ImageCollection";
import {
    FrmModalLoading_ReduxAction_ShowModal,
    FrmModalMessage_ReduxAction_ShowModal,
} from "../modalForm/Redux";
import { FrmListadoProducto_Url } from "../product/FrmListadoProducto";
import Frm from "./Frm";

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
    const dispatch = useDispatch();
    const [email_value, email_setValue] = useState("");
    const TbEmail = useRef<HTMLInputElement>(null);

    useEffect(() => {
        load();
    });

    const load = async () => {
        const db = getFirestore();

        let result1 = await db.collection("items").get();
        let arrItem: IItem[] = [];
        result1.docs.forEach((doc) => {
            let objItem = doc.data() as IItem;
            objItem.id = doc.id;
            arrItem.push(objItem);
        });

        let result2 = await db.collection("category").get();
        let arrCategories: ICategory[] = [];
        arrCategories.push({ id: "ALL", name: "VER TODO" });
        result2.docs.forEach((doc) => {
            let objCategory = doc.data() as ICategory;
            objCategory.id = doc.id;
            objCategory.name = objCategory.name.toUpperCase();
            arrCategories.push(objCategory);
        });

        dispatch(Item_ReduxAction_Add(arrItem));
        dispatch(Category_ReduxAction_Add(arrCategories));
    };

    const histoty = useHistory();

    return (
        <Frm className="global-background-color-orange">
            <div style={div1Css} className="global-background-color-orange">
                <img src={Img_LogoComplete} alt="logo"></img>

                <input
                    required={true}
                    ref={TbEmail}
                    type="email"
                    placeholder="digita tu email"
                    className="form-control mt-5"
                    value={email_value}
                    onChange={(event) => {
                        email_setValue(event.currentTarget.value);
                    }}
                />

                <div
                    onClick={async (event) => {
                        if (TbEmail.current?.checkValidity() === false) {
                            dispatch(
                                FrmModalMessage_ReduxAction_ShowModal(
                                    true,
                                    <p className="global-font-size-h3">
                                        {email_value === ""
                                            ? "Olvido ingresar su email"
                                            : "El texto digitado no tiene formato de email"}
                                    </p>
                                )
                            );
                        } else {
                            try {
                                dispatch(
                                    FrmModalLoading_ReduxAction_ShowModal(true)
                                );
                                dispatch(
                                    Order_ReduxAction_SetEmail(
                                        email_value.toLowerCase()
                                    )
                                );

                                const db = getFirestore();

                                let request = await db
                                    .collection("orders")
                                    .where(
                                        "email",
                                        "==",
                                        email_value.toLowerCase()
                                    )
                                    .get();

                                let obj = {
                                    email: email_value.toLowerCase(),
                                    items: [],
                                };

                                let userId = "";
                                let items: any[] = [];

                                if (request.docs.length === 0) {
                                    let request2 = await db
                                        .collection("orders")
                                        .add(obj);
                                    userId = request2.id;
                                } else {
                                    userId = request.docs[0].id;

                                    items = request.docs[0].data().items as [];
                                }

                                if (items.length !== 0) {
                                    let arrItem: IItem[] = [];

                                    for (let i = 0; i < items.length; i++) {
                                        let request3 = await db
                                            .collection("items")
                                            .where(
                                                firestore.FieldPath.documentId(),
                                                "==",
                                                items[i].itemId
                                            )
                                            .get();
                                        if (request3.docs.length === 1) {
                                            let objItem = request3.docs[0].data() as IItem;
                                            objItem.id = request3.docs[0].id;
                                            arrItem.push(objItem);
                                        }
                                    }

                                    let arrNotaDePedido: INotaDePedido[] = [];
                                    arrItem.forEach((obj) => {
                                        let cantidad = items.find(
                                            (objItem) => objItem.id === obj.id
                                        ).cantidad as number;
                                        if (cantidad) {
                                            arrNotaDePedido.push({
                                                cantidad,
                                                itemId: obj,
                                            });
                                        }
                                    });

                                    dispatch(
                                        NotaDePedido_ReduxAction_AddArray(
                                            arrNotaDePedido
                                        )
                                    );
                                }

                                dispatch(Order_ReduxAction_SetUserId(userId));

                                histoty.push(FrmListadoProducto_Url);
                            } catch (ex) {
                                console.log("error", ex);
                                dispatch(
                                    FrmModalLoading_ReduxAction_ShowModal(false)
                                );
                            }
                        }
                    }}
                    // to={FrmListadoProducto_Url}
                    className="mt-5 global-color-blue global-cursor-pointer global-font-size-h4"
                >
                    <FontAwesomeIcon icon={faSignInAlt} /> Ingresar
                </div>
            </div>
        </Frm>
    );
};
export default FrmIndex;
export const FrmIndex_Url = "/";
