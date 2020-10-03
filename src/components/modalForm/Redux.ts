import { Action } from "redux";
 

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const Type = "FrmModal_";

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const Type_FrmModalLoading_ShowModal = Type + "FrmModalLoading_ShowModal";
interface IFrmModalLoading_Action_ShowModal
  extends Action<typeof Type_FrmModalLoading_ShowModal> {
  show: boolean;
}
export const FrmModalLoading_ReduxAction_ShowModal = (
  value: boolean
): IFrmModalLoading_Action_ShowModal => ({
  type: Type_FrmModalLoading_ShowModal,
  show: value,
});
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const Type_FrmModalSiNo_ShowModal = Type + "FrmModalSiNo_ShowModal";
interface IFrmModalSiNo_Action_ShowModal
  extends Action<typeof Type_FrmModalSiNo_ShowModal> {
    show:boolean,
  message?: string;
  yesOnClick?: () => void;
  noOnClick?: () => void;
}
export const FrmModalSiNo_ReduxAction_ShowModal = (
  show:boolean,
  message?: string,
  yesOnClick?: () => void,
  noOnClick?: () => void
): IFrmModalSiNo_Action_ShowModal => ({
  type: Type_FrmModalSiNo_ShowModal,
 show,
  message,
  yesOnClick,
  noOnClick,
});
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface Redux_FrmModal_State {
  frmModalLoading_show: boolean;
  frmModalSiNo_show: boolean;
  yesOnClick?: () => void;
  noOnClick?: () => void;
  message?: string;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const Redux_FrmModal_Reducer = (
  state: Redux_FrmModal_State = {
    frmModalLoading_show: false,
    frmModalSiNo_show: false,
    yesOnClick: () => {},
    noOnClick: () => {},
    message: "",
  },
  action: IFrmModalLoading_Action_ShowModal | IFrmModalSiNo_Action_ShowModal
): Redux_FrmModal_State => {
  switch (action.type) {
    case Type_FrmModalLoading_ShowModal: {
      let obj = action as IFrmModalLoading_Action_ShowModal;
      return {
        ...state,
        frmModalLoading_show: obj.show,
      };
    }
    case Type_FrmModalSiNo_ShowModal: {
      let obj = action as IFrmModalSiNo_Action_ShowModal;
      return {
        ...state,
        frmModalSiNo_show: obj.show,
        message: obj.message,
        yesOnClick: obj.yesOnClick,
        noOnClick: obj.noOnClick,
      };
    }
    default:
      return state;
  }
};
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
