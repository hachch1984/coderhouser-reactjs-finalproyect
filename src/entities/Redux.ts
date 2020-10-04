import { Action } from "redux";
import { INotaDePedido } from "./INotaDePedido";
import { IItem } from "./IItem";
import { ICategory } from "./ICategory";

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
const Type_NotaDePedido_Remove = Type + "NotaDePedido_Remove";
interface INotaDePedido_Action_Remove
  extends Action<typeof Type_NotaDePedido_Remove> {
  objItem: IItem;
}
export const NotaDePedido_ReduxAction_Remove = (
  objItem: IItem
): INotaDePedido_Action_Add => ({
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

interface Redux_Entity_State {
  arrNotaDePedido: INotaDePedido[];
  arrCategories: ICategory[];
  selectedCategoryId: string;
  arrItem: IItem[];
}
//-----------------------------------------------------------------------------------------------------------------------------------------------

export const Redux_Entity_Reducer = (
  state: Redux_Entity_State = {
    arrNotaDePedido: [],
    arrCategories: [],
    selectedCategoryId: "ALL",
    arrItem: [],
  },
  
  action:
    | INotaDePedido_Action_Add
    | INotaDePedido_Action_Remove
    | ICategory_Action_Add
    | ICategory_Action_SetSelected
    | IItem_Action_Add
): Redux_Entity_State => {
  switch (action.type) {
    case Type_Item_Add: {
      let objAction = action as IItem_Action_Add;
      return { ...state, arrItem: objAction.arrItem };
    }
    case Type_Category_SetSelected: {
      let objAction = action as ICategory_Action_SetSelected;
      let x = { ...state, selectedCategoryId: objAction.id 
      };
      console.log('redux',x)
   return x
    }
    case Type_Category_Add: {
      let objAction = action as ICategory_Action_Add;
      return { ...state, arrCategories: objAction.arrCategory };
    }
    case Type_NotaDePedido_Add: {
      let objAction = action as INotaDePedido_Action_Add;

      let index = state.arrNotaDePedido.findIndex(
        (obj) => obj.objItem.id === objAction.objItem.id
      );

      if (index >= 0) {
        return {
          ...state,
          arrNotaDePedido: state.arrNotaDePedido.map((obj) => {
            if (obj.objItem.id === objAction.objItem.id) {
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
            { objItem: objAction.objItem, cantidad: 1 },
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
            if (obj.objItem.id === objAction.objItem.id) {
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
