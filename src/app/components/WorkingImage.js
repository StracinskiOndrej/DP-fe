import React from 'react';

const WorkingImage = ({ imageUrl }) => {
    const handleDragStart = (e) => {
        e.dataTransfer.setData('image/url', imageUrl);
    };

    return (
        imageUrl && <img src={imageUrl} alt="Generated Image" draggable onDragStart={handleDragStart} className="w-full h-full object-contain" />
    );
};

export default WorkingImage;