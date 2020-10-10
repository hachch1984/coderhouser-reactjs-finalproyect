import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { RootState } from "../../store/Stores";
import FrmModalLoading from "../modalForm/FrmModalLoading";
import FrmModalMessage from "../modalForm/FrmModalMessage";
import FrmModalSiNo from "../modalForm/FrmModalSiNo";
import { FrmModalLoading_ReduxAction_ShowModal } from "../modalForm/Redux";
import { FrmIndex_Url } from "./FrmIndex";

const Frm: React.FC<{ className?: string }> = (props) => {
    const stateFrmModal = useSelector((obj: RootState) => obj.FrmModal);
    const stateEntity = useSelector((obj: RootState) => obj.Entity);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (stateEntity.email === "") {
            history.push(FrmIndex_Url);
        } else {
            setInterval(() => {
                dispatch(FrmModalLoading_ReduxAction_ShowModal(false));
            }, 1000);
        }
    }, []);

    return (
        <div
            className={props.className}
            style={{ width: "100%", height: "100vh" }}
        >
            {props.children}

            {stateFrmModal.frmModalSiNo_show && <FrmModalSiNo />}
            {stateFrmModal.frmModalMessage_show && <FrmModalMessage />}

            {stateFrmModal.frmModalLoading_show && <FrmModalLoading />}
        </div>
    );
};

export default Frm;
