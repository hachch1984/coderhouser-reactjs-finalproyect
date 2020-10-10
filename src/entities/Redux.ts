import { Action } from "redux";
import { ICategory } from "./ICategory";
import { IItem } from "./IItem";
import { INotaDePedido } from "./INotaDePedido";

//-----------------------------------------------------------------------------------------------------------------------------------------------
const Type = "Entities_";
//-----------------------------------------------------------------------------------------------------------------------------------------------
const Type_NotaDePedido_Add = Type + "NotaDePedido_Add";
interface INotaDePedido_Action_Add
  extends Action<typeof Type_NotaDePedido_Add> {
  objItem: IItem;
}
export const NotaDePedido_ReduxAction_Add = (
  objItem: IItem
): INotaDePedido_Action_Add => ({
  type: Type_NotaDePedido_Add,
  objItem,
});
//-----------------------------------------------------------------------------------------------------------------------------------------------
const Type_NotaDePedido_AddArray = Type + "NotaDePedido_AddArray";
interface INotaDePedido_Action_AddArray
  extends Action<typeof Type_NotaDePedido_AddArray> {
  arrNotaDePedido: INotaDePedido[];
}
export const NotaDePedido_ReduxAction_AddArray = (
  arrNotaDePedido: INotaDePedido[]
): INotaDePedido_Action_AddArray => ({
  type: Type_NotaDePedido_AddArray,
  arrNotaDePedido,
});
//-----------------------------------------------------------------------------------------------------------------------------------------------
const Type_NotaDePedido_Remove = Type + "NotaDePedido_Remove";
interface INotaDePedido_Action_Remove
  extends Action<typeof Type_NotaDePedido_Remove> {
  objItem: IItem;
}
export const NotaDePedido_ReduxAction_Remove = (
  objItem: IItem
): INotaDePedido_Action_Remove => ({
  type: Type_NotaDePedido_Remove,
  objItem,
});

//-----------------------------------------------------------------------------------------------------------------------------------------------
const Type_Category_Add = Type + "Category_Add";
interface ICategory_Action_Add extends Action<typeof Type_Category_Add> {
  arrCategory: ICategory[];
}
export const Category_ReduxAction_Add = (
  arrCategory: ICategory[]
): ICategory_Action_Add => ({
  type: Type_Category_Add,
  arrCategory,
});
//-----------------------------------------------------------------------------------------------------------------------------------------------
const Type_Item_Add = Type + "Item_Add";
interface IItem_Action_Add extends Action<typeof Type_Item_Add> {
  arrItem: IItem[];
}
export const Item_ReduxAction_Add = (arrItem: IItem[]): IItem_Action_Add => ({
  type: Type_Item_Add,
  arrItem,
});

//-----------------------------------------------------------------------------------------------------------------------------------------------
const Type_Category_SetSelected = Type + "Category_SetSelected";
interface ICategory_Action_SetSelected
  extends Action<typeof Type_Category_SetSelected> {
  id: string;
}
export const Category_ReduxAction_SetSelected = (
  id: string
): ICategory_Action_SetSelected => ({
  type: Type_Category_SetSelected,
  id,
});

//-----------------------------------------------------------------------------------------------------------------------------------------------
const Type_Order_SetEmail = Type + "Order_SetEmail";
interface IOrder_Action_SetEmail extends Action<typeof Type_Order_SetEmail> {
  email: string;
}
export const Order_ReduxAction_SetEmail = (
  email: string
): IOrder_Action_SetEmail => ({
  type: Type_Order_SetEmail,
  email,
});

//-----------------------------------------------------------------------------------------------------------------------------------------------
const Type_Order_SetUserId = Type + "Order_SetUserId";
interface IOrder_Action_SetUserId extends Action<typeof Type_Order_SetUserId> {
  userId: string;
}
export const Order_ReduxAction_SetUserId = (
  userId: string
): IOrder_Action_SetUserId => ({
  type: Type_Order_SetUserId,
  userId,
});

//-----------------------------------------------------------------------------------------------------------------------------------------------

interface Redux_Entity_State {
  arrNotaDePedido: INotaDePedido[];
  arrCategories: ICategory[];
  selectedCategoryId: string;
  arrItem: IItem[];
  email: string;
  userId: string;
}
//-----------------------------------------------------------------------------------------------------------------------------------------------

export const Redux_Entity_Reducer = (
  state: Redux_Entity_State = {
    arrNotaDePedido: [],
    arrCategories: [],
    selectedCategoryId: "ALL",
    arrItem: [],
    email: "",
    userId: "",
  },

  action:
    | INotaDePedido_Action_Add
    | INotaDePedido_Action_Remove
    | ICategory_Action_Add
    | ICategory_Action_SetSelected
    | IItem_Action_Add
    | IOrder_Action_SetEmail
    | IOrder_Action_SetUserId
    | INotaDePedido_Action_AddArray
): Redux_Entity_State => {
  switch (action.type) {
    case Type_NotaDePedido_AddArray: {
      return {
        ...state,
        arrNotaDePedido: (action as INotaDePedido_Action_AddArray)
          .arrNotaDePedido,
      };
    }
    case Type_Order_SetUserId: {
      return { ...state, userId: (action as IOrder_Action_SetUserId).userId };
    }
    case Type_Order_SetEmail: {
      return { ...state, email: (action as IOrder_Action_SetEmail).email };
    }
    case Type_Item_Add: {
      let objAction = action as IItem_Action_Add;
      return { ...state, arrItem: objAction.arrItem };
    }
    case Type_Category_SetSelected: {
      let objAction = action as ICategory_Action_SetSelected;
      return { ...state, selectedCategoryId: objAction.id };
    }
    case Type_Category_Add: {
      let objAction = action as ICategory_Action_Add;
      return { ...state, arrCategories: objAction.arrCategory };
    }
    case Type_NotaDePedido_Add: {
      let objAction = action as INotaDePedido_Action_Add;

      let index = state.arrNotaDePedido.findIndex(
        (obj) => obj.itemId.id === objAction.objItem.id
      );

      if (index >= 0) {
        return {
          ...state,
          arrNotaDePedido: state.arrNotaDePedido.map((obj) => {
            if (obj.itemId.id === objAction.objItem.id) {
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
            { itemId: objAction.objItem, cantidad: 1 },
          ],
        };
      }
    }
    case Type_NotaDePedido_Remove: {
      let objAction = action as INotaDePedido_Action_Remove;
      return {
        ...state,
        arrNotaDePedido: state.arrNotaDePedido
          .map((obj) => {
            if (obj.itemId.id === objAction.objItem.id) {
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
