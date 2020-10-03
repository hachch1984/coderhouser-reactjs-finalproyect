import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { Redux_FrmModal_Reducer } from "../components/modalForm/Redux";
import { Redux_NotaDePedido_Reducer } from "../components/product/Redux";


const ArrReducer=combineReducers({
    FrmModal:Redux_FrmModal_Reducer,
    NotaDePedido:Redux_NotaDePedido_Reducer,
})

export type RootState=ReturnType<typeof ArrReducer>

export const StoreApp=createStore(ArrReducer,applyMiddleware(thunk));



