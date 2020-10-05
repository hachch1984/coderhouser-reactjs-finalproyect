import React from "react";
import FrmModal from "./FrmModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { FrmModalMessage_ReduxAction_ShowModal, FrmModalSiNo_ReduxAction_ShowModal } from "./Redux";
import { RootState } from "../../store/Stores";

const FrmModalMessage: React.FC = () => {
  const dispatch = useDispatch();

   

  const state = useSelector((obj: RootState) => obj.FrmModal);

  return (
    <FrmModal>
      <div
        className="card"
        style={{ width: "50%", position: "fixed", top: "30%", left: "25%" }}
      >
        <div className="card-header global-background-color-yellow">
          <p className="card-title global-font-size-h6 global-color-blue">
            Un Momento Por Favor !
          </p>
        </div>

        <div className="card-body py-5">
          <div className="card-text text-center global-font-size-h5 ">
            {state.frmModalMessage_message}
          </div>
        </div>
        <div className="card-footer d-flex justify-content-center global-background-color-yellow">
          <button
            className="btn btn-primary"
            onClick={() => {
                dispatch(FrmModalMessage_ReduxAction_ShowModal(false));
            }}
          >
            <FontAwesomeIcon className="mr-1" icon={faCheck} />
            ACEPTAR
          </button>
        </div>
      </div>
    </FrmModal>
  );
};

export default FrmModalMessage;
