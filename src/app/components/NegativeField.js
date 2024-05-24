import React from 'react';

const NegativeField = ({ value, onChange }) => {
    return (
        <div className="p-4 pb-8">
            <label className="text-black">Negative Prompt:</label>
            <textarea
                value={value}
                onChange={onChange}
                className="m-2 p-2 border border-gray-300 rounded w-full h-full text-black text-left"
                style={{resize: "none", overflow: "hidden"}}
            />
        </div>
    );
};

export default NegativeField;