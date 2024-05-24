import React from 'react';

const GetGallery = ({ onClick }) => {
    return (
        <button onClick={onClick} className="px-4 py-2 text-white rounded hover:bg-gray-600 bg-gray-700">
            Reload Gallery
        </button>
    );
};

export default GetGallery;