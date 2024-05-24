import React from 'react';

const SaveToGalleryButton = ({ onClick }) => {
    return (
        <button onClick={onClick} className="m-2 p-2 text-white rounded hover:bg-gray-600 bg-gray-700">
            Save To Gallery
        </button>
    );
};

export default SaveToGalleryButton;