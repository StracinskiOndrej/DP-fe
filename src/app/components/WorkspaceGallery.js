import React, { useState, useEffect } from 'react';
import GalleryImage from './GalleryImage';

const WorkspaceGallery = ({ images = [], updateImages }) => {
    const [workspaceImages, setWorkspaceImages] = useState(images);

    useEffect(() => {
        updateImages(workspaceImages);
    }, [workspaceImages, updateImages]);

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const imageUrl = e.dataTransfer.getData('image/url');
        const imageName = e.dataTransfer.getData('image/name');
        if (imageUrl && imageName) {
            setWorkspaceImages([...workspaceImages, { name: imageName, url: imageUrl }]);
        } else {
            handleFileDrop(e);
        }
    };

    const handleFileDrop = (e) => {
        const files = e.dataTransfer.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const imageUrl = URL.createObjectURL(file);
            setWorkspaceImages(prevImages => [...prevImages, { name: file.name, url: imageUrl }]);
        }
    };

    const handleDragStart = (index) => {
        setWorkspaceImages(workspaceImages.filter((_, i) => i !== index));
    };

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '1rem',
                minHeight: '200px',
                backgroundColor: 'gray'
            }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {workspaceImages.map((image, index) => (
                <GalleryImage key={index} imageName={image.name} imageUrl={image.url} onDragStart={() => handleDragStart(index)} />
            ))}
        </div>
    );
};

export default WorkspaceGallery;