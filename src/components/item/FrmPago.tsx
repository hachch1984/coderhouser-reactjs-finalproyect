import {
    faCheckCircle,
    faCreditCard,
    faDollarSign,
    faEnvelopeSquare,
    faPhoneSquare,
    faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFirestore } from "../../firebase";
import { RootState } from "../../store/Stores";
import FrmHeaderBodyFooter from "../layout/FrmHeaderBodyFooter";
import {
    FrmModalMessage_ReduxAction_ShowModal,
    FrmModalSiNo_ReduxAction_ShowModal,
} from "../modalForm/Redux";
import CmpProductCard from "./CmpProductCard";

const FrmPago: React.FC = (props) => {
    const state = useSelector((obj: RootState) => obj.Entity);
    const dispatch = useDispatch();
    const [email_value, email_setValue] = useState("");
    const [emailConfirmation_value, emailConfirmation_setValue] = useState("");
    const [fullName_value, fullName_setValue] = useState("");
    const [phone_value, phone_setValue] = useState("");

    const [pay_value, pay_setValue] = useState(false);

    const prepareString = (value: number) => {
        return value < 10 ? "0" + value : value;
    };

    useEffect(() => {
        email_setValue(state.email);
        pay_setValue(false);
    }, [state.arrNotaDePedido]);

    const bnConfirmation = () => {
        let arr: JSX.Element[] = [];

        if (emailConfirmation_value === "") {
            arr.push(
                <li className="mt-1">
                    <FontAwesomeIcon icon={faEnvelopeSquare} className="mr-1" />
                    <span>Confirmacion de Email</span>
                </li>
            );
        }
        if (fullName_value === "") {
            arr.push(
                <li className="mt-1">
                    <FontAwesomeIcon icon={faUserCircle} className="mr-1" />
                    <span>Nombre Completo</span>
                </li>
            );
        }
        if (phone_value === "") {
            arr.push(
                <li className="mt-1">
                    <FontAwesomeIcon icon={faPhoneSquare} className="mr-1" />
                    <span>Telefono</span>
                </li>
            );
        }
        if (arr.length !== 0) {
            let html: JSX.Element = (
                <div>
                    <h6 className="global-font-size-h5 mb-4">
                        Olvido ingresar la siguiente information
                    </h6>
                    <ul className="d-flex justify-content-start flex-column align-items-start global-font-size-h6">
                        {arr}
                    </ul>
                </div>
            );
            dispatch(FrmModalMessage_ReduxAction_ShowModal(true, html));
        } else if (email_value !== emailConfirmation_value) {
            let html: JSX.Element = (
                <div>
                    <h6 className="global-font-size-h5 mb-4">
                        El email y la confirmacion del email no son iguales
                    </h6>
                </div>
            );
            dispatch(FrmModalMessage_ReduxAction_ShowModal(true, html));
        } else {
            let yes = async () => {
                const db = getFirestore();

                let date = new Date();
                let orderCode =
                    String(date.getFullYear()) +
                    prepareString(date.getMonth()) +
                    prepareString(date.getDay()) +
                    prepareString(date.getHours()) +
                    prepareString(date.getMinutes()) +
                    prepareString(date.getSeconds());

                let obj = {
                    email: state.email,
                    items: state.arrNotaDePedido.map((obj) => ({
                        itemId: obj.itemId.id,
                        cantidad: obj.cantidad,
                    })),
                    orderCode: orderCode,
                };

                await db.collection("orders").doc(state.userId).update(obj);

                dispatch(
                    FrmModalMessage_ReduxAction_ShowModal(
                        true,
                        <div>su codigo de pedido es : {orderCode}</div>
                    )
                );
            };
            dispatch(
                FrmModalSiNo_ReduxAction_ShowModal(
                    true,
                    <p>esta segur@ de proceder con la compra</p>,
                    yes
                )
            );
        }
    };

    return (
        <FrmHeaderBodyFooter
            hideShoppingIcon={true}
            hideTextBox={true}
            showContinueShopping={true}
        >
            <div className="container ">
                <div className="row">
                    <div className="col-12  col-md-7 order-1 order-md-0 d-flex flex-column align-items-center">
                        {state.arrNotaDePedido.map((obj) => (
                            <CmpProductCard
                                key={obj.itemId.id}
                                defaultOrientation="horizontal"
                                objItem={obj.itemId}
                                showRemoveButton={true}
                                showTotalSelectedItems={true}
                            />
                        ))}
                    </div>

                    <div className="col-12 col-md-5  order-0 order-md-1">
                        <div className="card mt-2 global-background-color-orange">
                            <div className="card-body   d-flex flex-column justify-content-center align-items-center  mx-4 ">
                                <p className="my-3 global-font-size-h5 global-color-blue text-center">
                                    Total a Pagar
                                </p>
                                <p className="my-3 global-font-size-h4 global-color-blue">
                                    <FontAwesomeIcon
                                        icon={faDollarSign}
                                        className="mr-1"
                                    />
                                    {state.arrNotaDePedido
                                        .map(
                                            (obj) =>
                                                obj.cantidad * obj.itemId.price
                                        )
                                        .reduce((a, b) => a + b, 0)}
                                </p>
                                <button
                                    className="btn btn-primary my-3 px-5"
                                    onClick={(event) => {
                                        pay_setValue(true);
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faCreditCard}
                                        className="mr-3"
                                    />
                                    Pagar
                                </button>

                                {state.arrNotaDePedido.length > 0 && pay_value && (
                                    <div>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email"
                                            value={email_value}
                                            readOnly={true}
                                        />
                                        <input
                                            type="email"
                                            className="form-control mt-2"
                                            placeholder="Confirmacion de Email"
                                            value={emailConfirmation_value}
                                            onChange={(event) =>
                                                emailConfirmation_setValue(
                                                    event.currentTarget.value
                                                )
                                            }
                                        />
                                        <input
                                            type="text"
                                            className="form-control mt-2"
                                            placeholder="Nombre Completo"
                                            value={fullName_value}
                                            onChange={(event) =>
                                                fullName_setValue(
                                                    event.currentTarget.value
                                                )
                                            }
                                        />
                                        <input
                                            type="text"
                                            className="form-control mt-2"
                                            placeholder="Telefono"
                                            value={phone_value}
                                            onChange={(event) =>
                                                phone_setValue(
                                                    event.currentTarget.value
                                                )
                                            }
                                        />
                                        <button
                                            className="btn btn-primary my-2 px-5 d-flex justify-content-center align-items-center"
                                            onClick={bnConfirmation}
                                        >
                                            <FontAwesomeIcon
                                                icon={faCheckCircle}
                                                className="mr-3"
                                            />
                                            Confirmar Compra
                                        </button>
                                    </div>
                                )}
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
