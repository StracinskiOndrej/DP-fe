import React from 'react';

const GenerateButton = ({ onClick, text }) => {
    return (
        <button onClick={onClick} className="m-2 p-2 bg-green-500 text-white border-none rounded cursor-pointer">{text}</button>
    );
};

export default GenerateButton;