import React, { useState } from 'react';
import WorkingImage from './WorkingImage';

const ImageUpload = ({ onChange }) => {
    const [dragging, setDragging] = useState(false);
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');

    const handleImageChange = (e) => {
        onChange(e);

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setImagePreviewUrl('');
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);

        if (e.dataTransfer.items) {
            for (var i = 0; i < e.dataTransfer.items.length; i++) {
                // Check if the dragged item is a file
                if (e.dataTransfer.items[i].kind === 'file') {
                    let file = e.dataTransfer.items[i].getAsFile();
                    handleImageChange({ target: { files: [file] } });
                }
                // Check if the dragged item is an image URL from CurrentImage.js
                else if (e.dataTransfer.items[i].type === 'image/url') {
                    let imageUrl = e.dataTransfer.getData('image/url');
                    fetch(imageUrl)
                        .then(res => res.blob())
                        .then(blob => {
                            let file = new File([blob], "image.png", { type: 'image/png' });
                            handleImageChange({ target: { files: [file] } });
                        });
                }
            }
        }
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`w-1/4 h-1/3 object-contain p-2 ${dragging ? 'bg-gray-200' : ''}`}
        >
            {imagePreviewUrl && <WorkingImage imageUrl={imagePreviewUrl} />}
            <input type="file" onChange={handleImageChange} className="block mx-auto m-2 border border-gray-300 p-2" />
        </div>
    );
};

export default ImageUpload;