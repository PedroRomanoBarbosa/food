import React from "react";
import "./PrintButton.css";

const PrintButton = ({
    onClick,
}) => {
    return (
        <div className="print-button-container" >
            <i className="material-icons print-button" onClick={onClick}>
                print
            </i>
        </div>
    )
}

export default PrintButton;