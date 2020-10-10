import React, { CSSProperties, useEffect } from "react";

const divCss: CSSProperties = {
    position: "fixed",
    backgroundColor: "rgba(69, 48, 48, 0.7)",
    bottom: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
};

const FrmModal: React.FC<{ childrenStyle?: CSSProperties }> = (props) => {
    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div style={divCss}>
            <div style={props.childrenStyle}>{props.children}</div>
        </div>
    );
};

export default FrmModal;
