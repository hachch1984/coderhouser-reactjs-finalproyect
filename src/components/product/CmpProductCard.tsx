import React, { useEffect, useRef, useState } from "react";
import { IItem } from "../../entities/IItem";
import { Img_NoImage } from "../../images/ImageCollection";
import CompLoading from "../modalForm/CompLoading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faMinusSquare,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Stores";
import {
  NotaDePedido_ReduxAction_Add,
  NotaDePedido_ReduxAction_Remove,  
} from "../../entities/Redux";
import {
  FrmModalLoading_ReduxAction_ShowModal,
  FrmModalSiNo_ReduxAction_ShowModal,
} from "../modalForm/Redux"; 
import { getFirestore } from "../../firebase";

const CmpProductCard: React.FC<{
  objItem: IItem;
  showAddButton?: boolean;
  showRemoveButton?: boolean;
  showTotalSelectedItems?: boolean;
  defaultOrientation: "vertical" | "horizontal" | "mixed";
  alwaysCol12?: boolean;
}> = (props) => {
  const state = useSelector((obj: RootState) => obj.Entity);
  const dispatch = useDispatch();
  const [image_value, image_setValue] = useState("");
  const getImg = async () => {
    let request = await fetch(props.objItem.img);
    let response = await request.blob();
    image_setValue(URL.createObjectURL(response));
  };

  const objDiv1 = useRef<HTMLDivElement>(null);
  const objDiv2 = useRef<HTMLDivElement>(null);
  const objP = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    getImg();
  }, []);

  const questionModalFormTextInformation = (isAdd: boolean) => {
    let objFinded = state.arrNotaDePedido.find(
      (obj) => obj.itemId.id === props.objItem.id
    );
    return (
      <React.Fragment>
        <p>
          {isAdd
            ? "esta segur@ de agregar al carrito el producto:"
            : "esta segur@ de retirar del carrito el producto"}
        </p>
        <p className="global-font-size-h3 global-color-blue my-4">
          {props.objItem.title}
        </p>

        {objFinded && (
          <p className="text-muted global-font-size-9">
            Productos del mismo tipo ingresados en el carrito:{" "}
            {objFinded.cantidad} <FontAwesomeIcon icon={faShoppingCart} />
          </p>
        )}
      </React.Fragment>
    );
  };

  const bnAgregarOnClick = () => {
    dispatch(
      FrmModalSiNo_ReduxAction_ShowModal(
        true,
        questionModalFormTextInformation(true),
        async () => {
          try {
            dispatch(FrmModalLoading_ReduxAction_ShowModal(true));
            const db = getFirestore();

            let obj = {
              email: state.email,
              items: state.arrNotaDePedido.map((obj) => ({
                itemId: obj.itemId.id,
                cantidad: obj.cantidad,
              })),
            };

            let objItem = obj.items.find(
              (obj) => obj.itemId === props.objItem.id
            );
            if (objItem) {
              objItem.cantidad++;
            } else {
              obj.items.push({ cantidad: 1, itemId: props.objItem.id });
            }

            await db.collection("orders").doc(state.userId).update(obj);

            dispatch(NotaDePedido_ReduxAction_Add(props.objItem));
          } catch (ex) {
            console.log("error", ex);
          } finally {
            dispatch(FrmModalLoading_ReduxAction_ShowModal(false));
          }
        }
      )
    );
  };
  const bnQuitarOnClick = () => {
    let objFinded = state.arrNotaDePedido.find(
      (obj) => obj.itemId.id === props.objItem.id
    );
    if (objFinded) {
      dispatch(
        FrmModalSiNo_ReduxAction_ShowModal(
          true,
          questionModalFormTextInformation(false),
          async () => {
            try {
              dispatch(FrmModalLoading_ReduxAction_ShowModal(true));
              const db = getFirestore();

              let obj = {
                email: state.email,
                items: state.arrNotaDePedido.map((obj) => ({
                  itemId: obj.itemId.id,
                  cantidad: obj.cantidad,
                })),
              };

              let objItem = obj.items.find(
                (obj) => obj.itemId === props.objItem.id
              );

              if (objItem && objItem.cantidad) {
                if (objItem.cantidad > 1) {
                  objItem.cantidad = objItem.cantidad - 1;
                } else {
                  obj.items = obj.items.filter(
                    (obj) => obj.itemId != objItem?.itemId
                  );
                }

                await db.collection("orders").doc(state.userId).update(obj);

                dispatch(NotaDePedido_ReduxAction_Remove(props.objItem));
              }
            } catch (ex) {
              console.log("error", ex);
            } finally {
              dispatch(FrmModalLoading_ReduxAction_ShowModal(false));
            }
          }
        )
      );
    }
  };

  const eventMouseEnter = () => {
    objDiv1.current?.classList.add("global-shadow");
    objDiv2.current?.classList.add("font-weight-bolder");
    objP.current?.classList.add("pt-1");
  };
  const eventMouseLeave = () => {
    objDiv1.current?.classList.remove("global-shadow");
    objDiv2.current?.classList.remove("font-weight-bolder");
    objP.current?.classList.remove("pt-1");
  };

  const buttonsAddAndRemove = () => {
    let buttonAdd = props.showAddButton && (
      <div
        onClick={() => bnAgregarOnClick()}
        className="global-color-blue global-cursor-pointer d-flex align-items-center   global-hover-bold"
      >
        <FontAwesomeIcon icon={faPlusSquare} />
        <span className="global-font-size-8 ml-1 font-weight-bolder">
          Agregar
        </span>
      </div>
    );

    let totalSelectedItems = props.showTotalSelectedItems && (
      <div>
        <div className="global-color-blue d-flex align-items-center   global-hover-bold">
          <FontAwesomeIcon icon={faShoppingCart} />
          <span
            className="global-background-color-blue text-white global-font-size-7 p-1 ml-1"
            style={{ borderRadius: "50%" }}
          >
            {
              state.arrNotaDePedido.filter(
                (obj) => obj.itemId.id === props.objItem.id
              )[0]?.cantidad
            }
          </span>
        </div>
      </div>
    );

    let buttonRemove = props.showRemoveButton && (
      <div
        onClick={() => bnQuitarOnClick()}
        className="global-color-blue global-cursor-pointer d-flex align-items-center   global-hover-bold"
      >
        <span className="global-font-size-8 mr-1 font-weight-bolder">
          Quitar
        </span>
        <FontAwesomeIcon icon={faMinusSquare} />
      </div>
    );

    if (props.showAddButton || props.showRemoveButton) {
      return (
        <div className="d-flex justify-content-between mt-2">
          {buttonAdd}
          {totalSelectedItems}
          {buttonRemove}
        </div>
      );
    }
  };

  const horientation = () => {
    let str = "";

    switch (props.defaultOrientation) {
      case "horizontal":
        str = " col-6 ";
        break;
      case "mixed":
        str = " col-6 col-sm-12 ";
        break;
      case "vertical":
        str = " col-sm-12 ";
        break;
    }
    return str;
  };

  return (
    <div
      className={
        props.alwaysCol12
          ? "col-12 m-1"
          : "col-12 col-sm-5 col-md-4 col-lg-3 col-xl-2 m-1"
      }
    >
      <div
        ref={objDiv1}
        className="card   "
        style={{ maxHeight: "400px" }}
        onMouseEnter={eventMouseEnter}
        onMouseLeave={eventMouseLeave}
      >
        <div className="container-fluid p-0">
          <div className="row no-gutters">
            <div className={horientation()}>
              <img
                className="card-img-top"
                style={{
                  maxHeight: "200px",
                  height:
                    props.defaultOrientation === "horizontal"
                      ? "100%"
                      : undefined,
                }}
                src={image_value === "" ? Img_NoImage : image_value}
                alt={props.objItem.title}
              />
            </div>
            <div
              className={
                horientation() +
                " p-3 d-flex flex-column justify-content-around "
              }
            >
              <div ref={objDiv2}>
                <p className=" ">{props.objItem.title} </p>
                <p className="global-font-size-9 my-2">
                  '$'{props.objItem.price}{" "}
                </p>
              </div>
              <p ref={objP} className="card-text global-font-size-7 text-muted">
                {props.objItem.description}
              </p>

              {buttonsAddAndRemove()}
            </div>
          </div>
        </div>
      </div>
      {image_value === "" && <CompLoading />}
    </div>
  );
};

export default CmpProductCard;
