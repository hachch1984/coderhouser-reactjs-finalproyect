import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Stores";
import FrmModal from "./FrmModal";
import { FrmModalMessage_ReduxAction_ShowModal } from "./Redux";

const FrmModalMessage: React.FC = () => {
    const dispatch = useDispatch();

    const state = useSelector((obj: RootState) => obj.FrmModal);

    return (
        <FrmModal>
            <div
                className="card"
                style={{
                    width: "50%",
                    position: "fixed",
                    top: "20%",
                    left: "25%",
                }}
            >
                <div className="card-header global-background-color-yellow d-flex justify-content-between">
                    <p className="card-title global-font-size-h6 global-color-blue">
                        {state.frmModalMessage_title
                            ? state.frmModalMessage_title
                            : "Un Momento Por Favor !"}
                    </p>
                    {state.frmModalMessage_closeButton && (
                        <p
                            onClick={(event) => {
                                dispatch(
                                    FrmModalMessage_ReduxAction_ShowModal(false)
                                );
                            }}
                        >
                            close
                        </p>
                    )}
                </div>

                <div className="card-body py-5">
                    <div className="card-text text-center global-font-size-h5 ">
                        {state.frmModalMessage_message}
                    </div>
                </div>
                {state.frmModalMessage_closeButton ? (
                    ""
                ) : (
                    <div className="card-footer d-flex justify-content-center global-background-color-yellow">
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                dispatch(
                                    FrmModalMessage_ReduxAction_ShowModal(false)
                                );
                            }}
                        >
                            <FontAwesomeIcon className="mr-1" icon={faCheck} />
                            ACEPTAR
                        </button>
                    </div>
                )}
            </div>
        </FrmModal>
    );
};

export default FrmModalMessage;
