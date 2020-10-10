import React from "react";
import { CSSProperties } from "styled-components";
import { Gif_Loading1 } from "../../images/ImageCollection";

const div1Css: CSSProperties = {
    position: "absolute",
    backgroundColor: "rgba(69, 48, 48, 0.8)",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
};

const CompLoading: React.FC<{ className?: string }> = () => {
    return (
        <div className="card" style={div1Css}>
            <img
                style={{ width: "70px", height: "70px" }}
                src={Gif_Loading1}
                alt="loading"
            />
            <p>Cargando</p>
        </div>
    );
};
export default CompLoading;
