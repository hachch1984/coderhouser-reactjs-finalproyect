import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { IItem } from "../../entities/IItem";
import FrmHeaderBodyFooter from "../layout/FrmHeaderBodyFooter";
import CmpProductCard from "./CmpProductCard";

type PropsType = RouteComponentProps;

export interface FrmItemDetail_Param {
    objItem: IItem;
}

const FrmItemDetail: React.FC<PropsType> = (props) => {
    const [objItem_value, objItem_setValue] = useState<IItem>();

    useEffect(() => {
        let objItem = (props.location.state as FrmItemDetail_Param).objItem;
        objItem_setValue(objItem);
    }, []);

    return (
        <FrmHeaderBodyFooter showContinueShopping={true}>
            <div className="container ">
                {objItem_value && (
                    <CmpProductCard
                        objItem={objItem_value}
                        showInfo={false}
                        defaultOrientation="Detail"
                        showAddButton={true}
                        showRemoveButton={true}
                        showTotalSelectedItems={true}
                    ></CmpProductCard>
                )}{" "}
            </div>
        </FrmHeaderBodyFooter>
    );
};

export default FrmItemDetail;
export const FrmItemDetail_Url = "/itemDetail";
