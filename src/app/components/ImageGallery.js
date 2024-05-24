import React from 'react';
import GalleryImage from './GalleryImage';

const ImageGallery = ({ images, onImageDelete }) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
            {images.map((image, index) => (
                <GalleryImage key={index} imageName={image.name} imageUrl={image.url} onImageDelete={onImageDelete} />
            ))}
        </div>
    );
};

export default ImageGallery;