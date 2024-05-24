import React from 'react';

const RgbButton = ({ handleClick }) => {
    return (
        <button onClick={handleClick} className="px-4 py-2 text-white rounded hover:bg-gray-600 bg-gray-700">
            RGB
        </button>
    );
};

export default RgbButton;