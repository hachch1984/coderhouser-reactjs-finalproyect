import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CSSProperties } from "styled-components";
import { Img_LogoComplete } from "../../images/ImageCollection";
import Frm from "./Frm";
import { FrmListadoProducto_Url } from "../product/FrmListadoProducto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { getFirestore } from "../../firebase";
import { ICategory } from "../../entities/ICategory";
import { useDispatch } from "react-redux";
import {
  Category_ReduxAction_Add,
  Item_ReduxAction_Add,
} from "../../entities/Redux";
import { IItem } from "../../entities/IItem";

const div1Css: CSSProperties = {
  position: "absolute",
  width: "350px",
  height: "350px",
  left: "calc(50% - 175px)",
  top: "calc(50% - 175px)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
};

const FrmIndex = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const db = getFirestore();

    let result1 = await db.collection("items").get();
    let arrItem: IItem[] = [];
    result1.docs.forEach((doc) => {
      let objItem = doc.data() as IItem;
      objItem.id = doc.id;
      arrItem.push(objItem);
    });

    let result2 = await db.collection("category").get();
    let arrCategories: ICategory[] = [];
    arrCategories.push({ id: "ALL", name: "VER TODO" });
    result2.docs.forEach((doc) => {
      let objCategory = doc.data() as ICategory;
      objCategory.id = doc.id;
      objCategory.name = objCategory.name.toUpperCase();
      arrCategories.push(objCategory);
    });
    
    dispatch(Item_ReduxAction_Add(arrItem));
    dispatch(Category_ReduxAction_Add(arrCategories));
  };

  return (
    <Frm className="global-background-color-orange">
      <div style={div1Css} className="global-background-color-orange">
        <img src={Img_LogoComplete}></img>
        <Link
          to={FrmListadoProducto_Url}
          className="mt-5 global-color-blue global-cursor-pointer global-font-size-h4"
        >
          <FontAwesomeIcon icon={faSignInAlt} /> Ingresar
        </Link>
      </div>
    </Frm>
  );
};
export default FrmIndex;
export const FrmIndex_Url = "/";
