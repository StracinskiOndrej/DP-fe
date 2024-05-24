import React from 'react';

const MergeButton = ({ handleClick }) => {
    return (
        <button onClick={handleClick} className="px-4 py-2 text-white rounded hover:bg-gray-600 bg-gray-700">
            Merge
        </button>
    );
};

export default MergeButton;