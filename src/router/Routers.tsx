import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import FrmNotFound, { FrmNotFound_Url } from "../components/error/FrmNotFound";
import FrmIndex, { FrmIndex_Url } from "../components/layout/FrmIndex";
import FrmListadoProducto, {
    FrmListadoProducto_Url,
} from "../components/product/FrmListadoProducto";
import FrmPago, { FrmPago_Url } from "../components/product/FrmPago";

const Routers = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={FrmIndex_Url} component={FrmIndex} exact={true} />
                <Route
                    path={FrmListadoProducto_Url}
                    component={FrmListadoProducto}
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
