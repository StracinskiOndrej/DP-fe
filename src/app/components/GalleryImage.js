import React from 'react';
import config from '../config';

const base_url = config.baseUrl;
const GalleryImage = ({ imageName, imageUrl, onDragStart, onImageDelete }) => {
    const handleDragStart = (e) => {
        e.dataTransfer.setData('image/url', imageUrl);
        e.dataTransfer.setData('image/name', imageName);
        onDragStart && onDragStart();
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this image?")) {
            const formData = new FormData();
            formData.append('image_name', imageName);

            fetch(base_url + 'delete_from_gallery', {
                credentials: 'include',
                method: 'POST',
                body: formData
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json(); // Get JSON response
                })
                .then(data => {
                    console.log('Image deletion response:', data);
                    onImageDelete(imageName);
                })
                .catch(error => {
                    console.error('There was a problem with your fetch operation:', error);
                });
        }
    };


    return (
        <div style={{ position: 'relative' }}>
            <img src={imageUrl} alt={imageName || "Generated Image"} draggable onDragStart={handleDragStart} />
            <button
                className="text-lg p-2 bg-black text-white absolute top-0 right-0"
                onClick={handleDelete}
            >
                X
            </button>
        </div>
    );
};

export default GalleryImage;