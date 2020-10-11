import { Action } from "redux";

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const Type = "FrmModal_";

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const Type_FrmModalLoading_ShowModal = Type + "FrmModalLoading_ShowModal";
export interface IFrmModalLoading_Action_ShowModal
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
  show: boolean;
  message?: JSX.Element;
  yesOnClick?: () => void;
  noOnClick?: () => void;
}
export const FrmModalSiNo_ReduxAction_ShowModal = (
  show: boolean,
  message?: JSX.Element,
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

const Type_FrmModalMessage_ShowModal = Type + "FrmModalMessage_ShowModal";
interface IFrmModalMessage_Action_ShowModal
  extends Action<typeof Type_FrmModalMessage_ShowModal> {
  show: boolean;
  message?: JSX.Element;
  title?: string;
  showCloseButton?: boolean;
}
export const FrmModalMessage_ReduxAction_ShowModal = (
  show: boolean,
  message?: JSX.Element,
  title?: string,
  showCloseButton?: boolean
): IFrmModalMessage_Action_ShowModal => ({
  type: Type_FrmModalMessage_ShowModal,
  show,
  message,
  title,
  showCloseButton,
});
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface Redux_FrmModal_State {
  frmModalLoading_show: boolean;

  frmModalMessage_show: boolean;
  frmModalMessage_message?: JSX.Element;
  frmModalMessage_title?: string;
  frmModalMessage_closeButton?: boolean;

  frmModalSiNo_show: boolean;
  frmModalSiNo_yesOnClick?: () => void;
  frmModalSiNo_noOnClick?: () => void;
  frmModalSiNo_message?: JSX.Element;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const Redux_FrmModal_Reducer = (
  state: Redux_FrmModal_State = {
    frmModalLoading_show: false,

    frmModalMessage_show: false,
    frmModalMessage_message: undefined,
    frmModalMessage_closeButton: undefined,
    frmModalMessage_title: undefined,    

    frmModalSiNo_show: false,
    frmModalSiNo_yesOnClick: undefined,
    frmModalSiNo_noOnClick: undefined,
    frmModalSiNo_message: undefined,
  },
  action:
    | IFrmModalLoading_Action_ShowModal
    | IFrmModalSiNo_Action_ShowModal
    | IFrmModalMessage_Action_ShowModal
): Redux_FrmModal_State => {
  switch (action.type) {
    case Type_FrmModalMessage_ShowModal: {
      let obj = action as IFrmModalMessage_Action_ShowModal;
      console.log("obj", obj);
      return {
        ...state,
        frmModalMessage_show: obj.show,
        frmModalMessage_message: obj.message,
        frmModalMessage_closeButton: obj.showCloseButton,
        frmModalMessage_title: obj.title,
      };
    }
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
        frmModalSiNo_message: obj.show === false ? undefined : obj.message,
        frmModalSiNo_yesOnClick:
          obj.show === false ? undefined : obj.yesOnClick,
        frmModalSiNo_noOnClick: obj.show === false ? undefined : obj.noOnClick,
      };
    }
    default:
      return state;
  }
};
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
