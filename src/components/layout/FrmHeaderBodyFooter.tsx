import React from "react";
import CmpFooter from "./CmpFooter";
import CmpHeader from "./CmpHeader";
import Frm from "./Frm";

const FrmHeaderBodyFooter: React.FC<{
  hideTextBox?: boolean;
  hideShoppingIcon?: boolean;
  showContinueShopping?: boolean;
}> = (props) => {
  return (
    <Frm className="d-flex flex-column ">
      <CmpHeader
        hideShoppingIcon={props.hideShoppingIcon}
        hideTextBox={props.hideTextBox}
        showContinueShopping={props.showContinueShopping}
      />
      <div className=" flex-grow-1">{props.children}</div>
      <CmpFooter />
    </Frm>
  );
};

export default FrmHeaderBodyFooter;
