import React from "react";
import {
    Img_FlagPeru,
    Img_Henry,
    Img_LogoCoderHouse,
    Img_LogoReact,
} from "../../images/ImageCollection";

const Img1: React.FC<{ imgSrc: string; title: string }> = (props) => {
    return (
        <div
            className={" d-flex flex-row  flex-md-column align-items-center   "}
        >
            <img
                className="m-1"
                src={props.imgSrc}
                width="50"
                height="50"
                style={{ borderRadius: "50%" }}
                alt="owner"
            />
            <p className="text-center global-font-size-7">{props.title}</p>
        </div>
    );
};

const CmpFooter = () => {
    const className1 =
        "col-12 col-md-3 m-2 m-md-0 d-flex align-items-center justify-content-center";

    return (
        <div className="global-background-color-blue text-white">
            <div className="container ">
                <div className="row p-2 ">
                    <div className={className1}>
                        <Img1
                            imgSrc={Img_Henry}
                            title="Henry Alberto Chavez Chavez"
                        />
                    </div>
                    <div className={className1}>
                        <Img1 imgSrc={Img_FlagPeru} title="Peru" />
                    </div>
                    <div className={className1}>
                        <img
                            className=" img-fluid"
                            src={Img_LogoCoderHouse}
                            alt="logo"
                        />
                    </div>
                    <div className={className1}>
                        <img
                            className=" img-fluid"
                            height="50"
                            width="50"
                            src={Img_LogoReact}
                            alt="logo"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CmpFooter;
