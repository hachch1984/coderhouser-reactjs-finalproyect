import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { Redux_FrmModal_Reducer } from "../components/modalForm/Redux";
import { Redux_Entity_Reducer } from "../entities/Redux";

const ArrReducer = combineReducers({
  FrmModal: Redux_FrmModal_Reducer,
  Entity: Redux_Entity_Reducer,
});

export type RootState = ReturnType<typeof ArrReducer>;

export const StoreApp = createStore(ArrReducer, applyMiddleware(thunk));
