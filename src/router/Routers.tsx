import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import FrmNotFound, { FrmNotFound_Url } from "../components/error/FrmNotFound";
import FrmIndex, { FrmIndex_Url } from "../components/layout/FrmIndex";
import FrmItemDetail, {
    FrmItemDetail_Url
} from "../components/item/FrmItemDetail";
import FrmItemList, {
    FrmItemList_Url
} from "../components/item/FrmItemList";
import FrmPago, { FrmPago_Url } from "../components/item/FrmPago";

const Routers = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={FrmIndex_Url} component={FrmIndex} exact={true} />
                <Route
                    path={FrmItemList_Url}
                    component={FrmItemList}
                    exact={true}
                />
                <Route
                    path={FrmItemDetail_Url}
                    component={FrmItemDetail}
                    exact={true}
                />

                <Route path={FrmPago_Url} component={FrmPago} exact={true} />

                <Route path={FrmNotFound_Url} component={FrmNotFound} />
                <Route path="*" component={FrmNotFound} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routers;
