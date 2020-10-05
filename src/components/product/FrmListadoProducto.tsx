import React, { useEffect, useState } from "react";
import { IItem } from "../../entities/IItem";
import CmpProductCard from "./CmpProductCard";
import FrmHeaderBodyFooter from "../layout/FrmHeaderBodyFooter";
import { useDispatch, useSelector } from "react-redux";
import { FrmModalLoading_ReduxAction_ShowModal } from "../modalForm/Redux";
import { getFirestore } from "../../firebase";
import { ICategory } from "../../entities/ICategory";
import {
  Category_ReduxAction_Add,
  Item_ReduxAction_Add,
} from "../../entities/Redux";
import { RootState } from "../../store/Stores";

const FrmListadoProducto: React.FC = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((obj: RootState) => obj.Entity);
  
  useEffect(() => {
  





    
  }, []);
 
  return (
    <FrmHeaderBodyFooter>
      <div className=" container-fluid  ">
        <div className="row d-flex justify-content-center no-gutters">
          {state.arrItem && state.arrItem?.map((obj) => (
            <CmpProductCard
              key={obj.id}
              defaultOrientation="mixed"
              objItem={obj}
              showAddButton={true}
              showRemoveButton={true}
              showTotalSelectedItems={true}
            />
          ))}
        </div>
      </div>
    </FrmHeaderBodyFooter>
  );
};

export default FrmListadoProducto;
export const FrmListadoProducto_Url = "/listadoProducto";
