import React from "react";
import { IProduct } from "../../entities/IProduct";
import CmpProductCard from "./CmpProductCard"; 
import FrmHeaderBodyFooter from "../layout/FrmHeaderBodyFooter";

const FrmListadoProducto: React.FC = (props) => {
  let arrProduct: IProduct[] = [];

  for (let cont = 1; cont <= 12; cont++) {
    arrProduct.push({
      id: String(cont),
      url: "https://picsum.photos/400/400?random=" + cont,
      description: "descripcion imagen numero" + cont,
      name: "name " + cont,
      price: 50,
    });
  }

  return (
    <FrmHeaderBodyFooter  >
    
      <div className=" container-fluid  ">
        <div className="row d-flex justify-content-center no-gutters">
          {arrProduct.map((obj) => (
            <CmpProductCard key={obj.id}  defaultOrientation='mixed' objProduct={obj} showAddButton ={true} showRemoveButton={true} showTotalSelectedItems={true} />
          ))}
        </div>
      </div>
     
    </FrmHeaderBodyFooter>
  );
 
};

export default FrmListadoProducto;
export const FrmListadoProducto_Url = "/listadoProducto";
