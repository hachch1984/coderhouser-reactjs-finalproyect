import {
    faInfoCircle,
    faMinusSquare,
    faPlusSquare,
    faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IItem } from "../../entities/IItem";
import {
    NotaDePedido_ReduxAction_Add,
    NotaDePedido_ReduxAction_Remove,
} from "../../entities/Redux";
import { getFirestore } from "../../firebase";
import { Gif_Loading1 } from "../../images/ImageCollection";
import { RootState } from "../../store/Stores";
import {
    FrmModalLoading_ReduxAction_ShowModal,
    FrmModalSiNo_ReduxAction_ShowModal,
} from "../modalForm/Redux";
import { FrmItemDetail_Param, FrmItemDetail_Url } from "./FrmItemDetail";

const CmpProductCard: React.FC<{
    objItem: IItem;
    showAddButton?: boolean;
    showRemoveButton?: boolean;
    showTotalSelectedItems?: boolean;
    showInfo?: boolean;
    defaultOrientation: "vertical" | "horizontal" | "mixed" | "Detail";
}> = (props) => {
    const state = useSelector((obj: RootState) => obj.Entity);
    const dispatch = useDispatch();
    const [image_value, image_setValue] = useState("");

    const objDiv1 = useRef<HTMLDivElement>(null);
    const objDiv2 = useRef<HTMLDivElement>(null);
    const objP = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const getImg = async () => {
            let request = await fetch(props.objItem.img);
            let response = await request.blob();
            image_setValue(URL.createObjectURL(response));
        };

        getImg();
    }, []);

    const questionModalFormTextInformation = (isAdd: boolean) => {
        let objFinded = state.arrNotaDePedido.find(
            (obj) => obj.itemId.id === props.objItem.id
        );
        return (
            <React.Fragment>
                <p>
                    {isAdd
                        ? "esta segur@ de agregar al carrito el producto:"
                        : "esta segur@ de retirar del carrito el producto"}
                </p>
                <p className="global-font-size-h3 global-color-blue my-4">
                    {props.objItem.title}
                </p>

                {objFinded && (
                    <p className="text-muted global-font-size-9">
                        Productos del mismo tipo ingresados en el carrito:
                        {objFinded.cantidad}
                        <FontAwesomeIcon icon={faShoppingCart} />
                    </p>
                )}
            </React.Fragment>
        );
    };

    const bnAgregarOnClick = () => {
        dispatch(
            FrmModalSiNo_ReduxAction_ShowModal(
                true,
                questionModalFormTextInformation(true),
                async () => {
                    try {
                        dispatch(FrmModalLoading_ReduxAction_ShowModal(true));
                        const db = getFirestore();

                        let obj = {
                            email: state.email,
                            items: state.arrNotaDePedido.map((obj) => ({
                                itemId: obj.itemId.id,
                                cantidad: obj.cantidad,
                            })),
                        };

                        let objItem = obj.items.find(
                            (obj) => obj.itemId === props.objItem.id
                        );
                        if (objItem) {
                            objItem.cantidad++;
                        } else {
                            obj.items.push({
                                cantidad: 1,
                                itemId: props.objItem.id,
                            });
                        }

                        await db
                            .collection("orders")
                            .doc(state.userId)
                            .update(obj);

                        dispatch(NotaDePedido_ReduxAction_Add(props.objItem));
                    } catch (ex) {
                        console.log("error", ex);
                    } finally {
                        dispatch(FrmModalLoading_ReduxAction_ShowModal(false));
                    }
                }
            )
        );
    };
    const bnQuitarOnClick = () => {
        let objFinded = state.arrNotaDePedido.find(
            (obj) => obj.itemId.id === props.objItem.id
        );
        if (objFinded) {
            dispatch(
                FrmModalSiNo_ReduxAction_ShowModal(
                    true,
                    questionModalFormTextInformation(false),
                    async () => {
                        try {
                            dispatch(
                                FrmModalLoading_ReduxAction_ShowModal(true)
                            );
                            const db = getFirestore();

                            let obj = {
                                email: state.email,
                                items: state.arrNotaDePedido.map((obj) => ({
                                    itemId: obj.itemId.id,
                                    cantidad: obj.cantidad,
                                })),
                            };

                            let objItem = obj.items.find(
                                (obj) => obj.itemId === props.objItem.id
                            );

                            if (objItem && objItem.cantidad) {
                                if (objItem.cantidad > 1) {
                                    objItem.cantidad = objItem.cantidad - 1;
                                } else {
                                    obj.items = obj.items.filter(
                                        (obj) => obj.itemId !== objItem?.itemId
                                    );
                                }

                                await db
                                    .collection("orders")
                                    .doc(state.userId)
                                    .update(obj);

                                dispatch(
                                    NotaDePedido_ReduxAction_Remove(
                                        props.objItem
                                    )
                                );
                            }
                        } catch (ex) {
                            console.log("error", ex);
                        } finally {
                            dispatch(
                                FrmModalLoading_ReduxAction_ShowModal(false)
                            );
                        }
                    }
                )
            );
        }
    };

    const eventMouseEnter = () => {
        if (props.defaultOrientation !== "Detail") {
            objDiv1.current?.classList.add("global-shadow");
            objDiv2.current?.classList.add("font-weight-bolder");
            objP.current?.classList.add("pt-1");
        }
    };
    const eventMouseLeave = () => {
        if (props.defaultOrientation !== "Detail") {
            objDiv1.current?.classList.remove("global-shadow");
            objDiv2.current?.classList.remove("font-weight-bolder");
            objP.current?.classList.remove("pt-1");
        }
    };
    const renderButtonInfoAndTotalSelectedItems = () => {
        let info = props.showInfo && (
            <Link
                to={{
                    pathname: FrmItemDetail_Url,
                    state: {
                        objItem: props.objItem,
                    } as FrmItemDetail_Param,
                }}
            >
                <FontAwesomeIcon icon={faInfoCircle} />

                <span className=" ml-1 font-weight-bolder global-font-size-8 d-none d-md-inline">
                    Detalles
                </span>
            </Link>
        );
        let total = props.showTotalSelectedItems && (
            <div>
                <span className="global-color-blue global-font-size-8 font-weight-bold mr-1">
                    {
                        state.arrNotaDePedido.filter(
                            (obj) => obj.itemId.id === props.objItem.id
                        )[0]?.cantidad
                    }
                </span>
                <FontAwesomeIcon
                    icon={faShoppingCart}
                    className="d-none d-md-inline"
                />
            </div>
        );

        if (props.showInfo || props.showTotalSelectedItems) {
            return (
                <div
                    className=" d-flex justify-content-between global-color-blue align-items-center   global-cursor-pointer w-100 p-2"
                    style={{ position: "absolute", bottom: "0", left: "0" }}
                >
                    {info}
                    {total}
                </div>
            );
        }
    };

    const renderButtonsAddAndRemove = () => {
        let buttonAdd = props.showAddButton && (
            <div
                onClick={() => bnAgregarOnClick()}
                className="global-color-blue global-cursor-pointer d-flex align-items-center   global-hover-bold"
            >
                <FontAwesomeIcon icon={faPlusSquare} />
                <span className=" ml-1 font-weight-bolder d-none d-md-inline global-font-size-8 ">
                    Agregar
                </span>
            </div>
        );

        let buttonRemove = props.showRemoveButton && (
            <div
                onClick={() => bnQuitarOnClick()}
                className="global-color-blue global-cursor-pointer d-flex align-items-center   global-hover-bold"
            >
                <span className="  mr-1 font-weight-bolder d-none d-md-inline global-font-size-8 ">
                    Quitar
                </span>
                <FontAwesomeIcon icon={faMinusSquare} />
            </div>
        );

        if (props.showAddButton || props.showRemoveButton) {
            return (
                <div
                    className="  d-flex justify-content-between mt-1 w-100 p-2"
                    style={{ position: "absolute", top: "0", left: "0" }}
                >
                    {buttonAdd}
                    {buttonRemove}
                </div>
            );
        }
    };

    const horientation = () => {
        let str = "";

        switch (props.defaultOrientation) {
            case "Detail":
                str = " col-12 ";
                break;
            case "horizontal":
                str = " col-6 ";
                break;
            case "mixed":
                str = " col-6 col-md-12 ";
                break;
            case "vertical":
                str = " col-md-12 ";
                break;
        }
        return str;
    };

    const maxHeight = () => {
        let str = "";

        switch (props.defaultOrientation) {
            case "Detail":
                str = "600px";
                break;
            default:
                str = "200px";
                break;
        }
        return str;
    };

    return (
        <div
            ref={objDiv1}
            className="card m-2"
            onMouseEnter={eventMouseEnter}
            onMouseLeave={eventMouseLeave}
            style={{
                maxHeight:
                    props.defaultOrientation === "Detail" ? "none" : "400px",
                width: props.defaultOrientation === "Detail" ? "none" : "400px",
            }}
        >
            <div className="container-fluid p-0 ">
                <div className="row no-gutters">
                    <div
                        className={
                            horientation() +
                            " d-flex justify-content-center p-4"
                        }
                        style={{ maxHeight: maxHeight() }}
                    >
                        <img
                            className=" img-fluid "
                            style={{ maxHeight: maxHeight() }}
                            src={
                                image_value === "" ? Gif_Loading1 : image_value
                            }
                            alt={props.objItem.title}
                        />
                        {renderButtonsAddAndRemove()}
                        {renderButtonInfoAndTotalSelectedItems()}
                    </div>
                    <div
                        className={
                            horientation() +
                            " p-3 d-flex flex-column justify-content-around " +
                            (props.defaultOrientation === "Detail"
                                ? " text-center "
                                : "")
                        }
                        style={{ maxHeight: maxHeight() }}
                    >
                        <div ref={objDiv2}>
                            <p
                                className={
                                    props.defaultOrientation === "Detail"
                                        ? "global-font-size-h6"
                                        : ""
                                }
                            >
                                {props.objItem.title}{" "}
                            </p>
                            <p
                                className={
                                    " my-2 " +
                                    (props.defaultOrientation === "Detail"
                                        ? " global-font-size-h6 "
                                        : "global-font-size-9")
                                }
                            >
                                ${props.objItem.price}
                            </p>
                        </div>
                        <p
                            ref={objP}
                            className={
                                "text-muted " +
                                (props.defaultOrientation === "Detail"
                                    ? "card-text global-font-size-9"
                                    : "card-text global-font-size-7")
                            }
                        >
                            {props.objItem.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CmpProductCard;
