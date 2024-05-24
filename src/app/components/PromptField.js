import React from 'react';

const PromptField = ({ value, onChange }) => {
    return (
        <div className="p-4">
            <label className="text-black">Prompt:</label>
            <textarea
                value={value}
                onChange={onChange}
                className="m-2 p-2 border border-gray-300 rounded w-full h-full text-black text-left"
                style={{resize: "none", overflow: "hidden"}}
            />
        </div>
    );
};

export default PromptField;