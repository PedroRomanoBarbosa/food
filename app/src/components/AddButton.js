import React from "react";
import "./AddButton.css";

const AddButton = ({
    text,
    onClick,
}) => {
    return (
        <div className="add-button-container">
            <div className="add-button" onClick={onClick}>
                {text}
            </div>
        </div>
    );
};

export default AddButton;