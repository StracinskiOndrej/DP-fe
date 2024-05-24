import React from 'react';

const Models = ({ options, selectedOption, onOptionChange }) => {
    return (
        <select value={selectedOption} onChange={onOptionChange} className="px-4 py-2 rounded bg-gray-700 text-white">
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default Models;