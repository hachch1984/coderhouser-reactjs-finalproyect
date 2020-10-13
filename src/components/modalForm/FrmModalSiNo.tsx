import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Stores";
import FrmModal from "./FrmModal";
import { FrmModalSiNo_ReduxAction_ShowModal } from "./Redux";

const FrmModalSiNo: React.FC = () => {
    const dispatch = useDispatch();

    const showFalse = () => {
        dispatch(FrmModalSiNo_ReduxAction_ShowModal(false));
    };

    const state = useSelector((obj: RootState) => obj.FrmModal);

    return (
        <FrmModal>
            <div
                className="card"
                style={{
                    width: "70%",
                    position: "fixed",
                    top: "5%",
                    left: "15%",
                }}
            >
                <div className="card-header global-background-color-yellow">
                    <p className="card-title global-font-size-h6 global-color-blue">
                        Un Momento Por Favor !
                    </p>
                </div>

                <div className="card-body py-5">
                    <div className="card-text text-center global-font-size-h5 ">
                        {state.frmModalSiNo_message}
                    </div>
                </div>
                <div className="card-footer d-flex justify-content-center global-background-color-yellow">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            if (state.frmModalSiNo_yesOnClick) {
                                state.frmModalSiNo_yesOnClick();
                            }
                            showFalse();
                        }}
                    >
                        <FontAwesomeIcon className="mr-1" icon={faCheck} />
                        SI
                    </button>

                    <button
                        className="btn btn-danger ml-5"
                        onClick={() => {
                            if (state.frmModalSiNo_noOnClick) {
                                state.frmModalSiNo_noOnClick();
                            }
                            showFalse();
                        }}
                    >
                        <FontAwesomeIcon className="mr-1" icon={faTimes} />
                        NO
                    </button>
                </div>
            </div>
        </FrmModal>
    );
};

export default FrmModalSiNo;
