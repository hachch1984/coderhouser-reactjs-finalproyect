import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Stores";
import FrmModalLoading from "../modalForm/FrmModalLoading";
import FrmModalSiNo from "../modalForm/FrmModalSiNo";
import { FrmModalLoading_ReduxAction_ShowModal } from "../modalForm/Redux";

const Frm: React.FC<{ className?: string }> = (props) => {
  const state = useSelector((obj: RootState) => obj.FrmModal);
  const dispatch = useDispatch();

  useEffect(() => {
    setInterval(()=>{
      dispatch(FrmModalLoading_ReduxAction_ShowModal(false));
 

    },1000);
  }, []);

  return (
    <div className={props.className} style={{ width: "100%", height: "100vh" }}>
      {props.children}
      {state.frmModalLoading_show && <FrmModalLoading />}
      {state.frmModalSiNo_show && <FrmModalSiNo />}
    </div>
  );
};

export default Frm;
