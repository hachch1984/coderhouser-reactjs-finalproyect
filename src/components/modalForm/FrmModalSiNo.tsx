import React from "react";
import FrmModal from "./FrmModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { FrmModalSiNo_ReduxAction_ShowModal } from "./Redux";
import { RootState } from "../../store/Stores";

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
        style={{ width: "50%", position: "fixed", top: "30%", left: "25%" }}
      >
        <div className="card-header global-background-color-yellow">
          <p className="card-title global-font-size-h6 global-color-blue">
            Un Momento Por Favor !
          </p>
        </div>

        <div className="card-body py-5">
          <p className="card-text text-center global-font-size-h5 ">
            {state.message}
          </p>
        </div>
        <div className="card-footer d-flex justify-content-center global-background-color-yellow">
          <button
            className="btn btn-primary"
            onClick={() => {
              if (state.yesOnClick) {
                state.yesOnClick();
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
              if (state.noOnClick) {
                state.noOnClick();
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
