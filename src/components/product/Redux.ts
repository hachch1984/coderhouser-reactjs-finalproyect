import { Action } from "redux";
import { INotaDePedido } from "../../entities/INotaDePedido";
import { IProduct } from "../../entities/IProduct";

//-----------------------------------------------------------------------------------------------------------------------------------------------
const Type = "NotaDePedido_";
//-----------------------------------------------------------------------------------------------------------------------------------------------
const Type_Add = Type + "Add";
interface INotaDePedido_Action_Add extends Action<typeof Type_Add> {
  objProduct: IProduct;
}
export const NotaDePedido_ReduxAction_Add = (
  objProduct: IProduct
): INotaDePedido_Action_Add => ({
  type: Type_Add,
  objProduct,
});
//-----------------------------------------------------------------------------------------------------------------------------------------------

const Type_Remove = Type + "Remove";
interface INotaDePedido_Action_Remove extends Action<typeof Type_Remove> {
  objProduct: IProduct;
}
export const NotaDePedido_ReduxAction_Remove = (
  objProduct: IProduct
): INotaDePedido_Action_Add => ({
  type: Type_Remove,
  objProduct,
});

//-----------------------------------------------------------------------------------------------------------------------------------------------

interface Redux_NotaDePedido_State {
  arrNotaDePedido: INotaDePedido[];
}
//-----------------------------------------------------------------------------------------------------------------------------------------------

export const Redux_NotaDePedido_Reducer = (
  state: Redux_NotaDePedido_State = {
    arrNotaDePedido: [],
  },
  action: INotaDePedido_Action_Add | INotaDePedido_Action_Remove
): Redux_NotaDePedido_State => {
  switch (action.type) {
    case Type_Add: {
      let objAction = action as INotaDePedido_Action_Add;

      let index = state.arrNotaDePedido.findIndex(
        (obj) => obj.objProduct.id === objAction.objProduct.id
      );

      if (index >= 0) {
        return {
          ...state,
          arrNotaDePedido: state.arrNotaDePedido.map((obj) => {
            if (obj.objProduct.id === objAction.objProduct.id) {
              obj.cantidad++;
            }
            return obj;
          }),
        };
      } else {
        return {
          ...state,
          arrNotaDePedido: [
            ...state.arrNotaDePedido,
            { objProduct: objAction.objProduct, cantidad: 1 },
          ],
        };
      }
    }
    case Type_Remove: {
      let objAction = action as INotaDePedido_Action_Remove;
      return {
        ...state,
        arrNotaDePedido: state.arrNotaDePedido
          .map((obj) => {
            if (obj.objProduct.id === objAction.objProduct.id) {
              obj.cantidad--;
            }
            return obj;
          })
          .filter((obj) => obj.cantidad > 0),
      };
    }
    default:
      return state;
  }
};
