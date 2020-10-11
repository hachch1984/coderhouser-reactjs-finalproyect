import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Stores";
import FrmHeaderBodyFooter from "../layout/FrmHeaderBodyFooter";
import CmpProductCard from "./CmpProductCard";

const FrmItemList: React.FC = (props) => {
    const state = useSelector((obj: RootState) => obj.Entity);

    return (
        <FrmHeaderBodyFooter>
            <div className=" container-fluid   ">
                <div className="  d-flex flex-wrap  justify-content-center ">
                    {state.arrItem &&
                        state.arrItem?.map((obj) => (
                            <CmpProductCard
                                key={obj.id}
                                defaultOrientation="mixed"
                                objItem={obj}
                                showAddButton={true}
                                showRemoveButton={true}
                                showTotalSelectedItems={true}
                                showInfo={true}
                            />
                        ))}
                </div>
            </div>
        </FrmHeaderBodyFooter>
    );
};

export default FrmItemList;
export const FrmItemList_Url = "/itemList";
