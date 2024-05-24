import React from 'react';

const CurrentImage = ({ imageName, imageUrl }) => {
    const handleDragStart = (e) => {
        e.dataTransfer.setData('image/url', imageUrl);
    };

    return (
        imageUrl && <img src={imageUrl} alt={imageName || "Generated Image"} draggable onDragStart={handleDragStart} className="w-2/5 h-full object-contain" />
    );
};

export default CurrentImage;