import React, { useState } from 'react';
import WorkspaceGallery from './WorkspaceGallery';
import RgbButton from './RgbButton';
import CurrentImage from "@/app/components/CurrentImage";
import SaveToGalleryButton from "@/app/components/SaveToGalleryButton";
import MergeButton from "@/app/components/MergeButton";
import MergeGrayButton from "@/app/components/MergeGrayButton";
import config from '../config';

const base_url = config.baseUrl;

const Workspace = () => {
    const [images, setImages] = useState([]);
    const [imageUrl, setImageUrl] = useState('https://via.placeholder.com/528x528/808080/808080');
    const [imageName, setImageName] = useState('');

    const urlToFile = async (url, filename, mimeType) => {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], filename, {type: mimeType});
    }

    const updateImages = (newImages) => {
        setImages(newImages);
    };

    const handleSaveToGallery = () => {
        const formData = new FormData();
        formData.append('image_name', imageName);
        formData.append('image', imageUrl.split(',')[1]);

        fetch(base_url + 'save_to_gallery', {
            credentials: 'include',
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Image saved to gallery:', data);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    };

    const handleRGBClick = async () => { // make this function async
        const formData = new FormData();
        const filePromises = images.map((image, index) =>
            urlToFile(image.url, image.name, 'image/jpeg')
                .then(file => {
                    formData.append(`image${index}`, file);
                })
        );

        await Promise.all(filePromises);
        console.log(formData)

        fetch(base_url + 'rgb', {
            credentials: 'include',
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setImageName(data.image_name);
                const imageBase64 = data.image;
                const imgUrl = "data:image/jpeg;base64," + imageBase64;
                setImageUrl(imgUrl);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    };

    const handleMergeClick = async () => {
        const formData = new FormData();
        const filePromises = images.map((image, index) =>
            urlToFile(image.url, image.name, 'image/jpeg')
                .then(file => {
                    formData.append(`image${index}`, file);
                })
        );

        await Promise.all(filePromises);
        console.log(formData)

        fetch(base_url + 'merge', {
            credentials: 'include',
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setImageName(data.image_name);
                const imageBase64 = data.image;
                const imgUrl = "data:image/jpeg;base64," + imageBase64;
                setImageUrl(imgUrl);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    };

    const handleMergeGrayClick = async () => {
        const formData = new FormData();
        const filePromises = images.map((image, index) =>
            urlToFile(image.url, image.name, 'image/jpeg')
                .then(file => {
                    formData.append(`image${index}`, file);
                })
        );

        await Promise.all(filePromises);
        console.log(formData)

        fetch(base_url + 'merge_gray', {
            credentials: 'include',
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setImageName(data.image_name);
                const imageBase64 = data.image;
                const imgUrl = "data:image/jpeg;base64," + imageBase64;
                setImageUrl(imgUrl);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className=" h-[50vh]">
                <CurrentImage imageUrl={imageUrl} className="w-64 h-64 bg-gray-500" />
            </div>
            <WorkspaceGallery updateImages={updateImages} /> {}
            <RgbButton handleClick={handleRGBClick} />
            <MergeButton handleClick={handleMergeClick}/>
            <MergeGrayButton handleClick={handleMergeGrayClick}/>
            <SaveToGalleryButton onClick={handleSaveToGallery} />
        </div>
    );
};

export default Workspace;