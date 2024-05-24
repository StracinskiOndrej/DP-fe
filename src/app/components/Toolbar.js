'use client'

import React, {useEffect, useState} from 'react';
import Img2Img from "@/app/components/Img2Img";
import Switch from "react-switch"
import Txt2Img from "@/app/components/Txt2Img";
import ImageGallery from "@/app/components/ImageGallery";
import GetGallery from "@/app/components/GetGallery";
import Models from "@/app/components/Models";
import Workspace from "@/app/components/Workspace";
import config from '../config';

const base_url = config.baseUrl;

export default function Toolbar() {
    const [selectedComponent, setSelectedComponent] = useState('Txt2Img');
    const [galleryImages, setGalleryImages] = useState([]);
    const [selectedModel, setSelectedModel] = useState();
    const [modelOptions, setModelOptions] = useState([]);
    const [isPersonalizationEnabled, setPersonalizationEnabled] = useState(true);
    const [selectedRefiner, setSelectedRefiner] = useState('none');
    const [refinerOptions, setRefinerOptions] = useState([]);

    const handleComponentChange = (component) => {
        setSelectedComponent(component);
        if (component === 'Txt2Img') {
            if (!modelOptions.includes('Lightning')) {
                setModelOptions(prevOptions => [...prevOptions, 'Lightning']);
            }
        } else {
            setModelOptions(prevOptions => prevOptions.filter(option => option !== 'Lightning'));
        }
    };

    const handleTogglePersonalization = () => {
        setPersonalizationEnabled(!isPersonalizationEnabled);
    };

    const handleModelChange = (event) => {
        setSelectedModel(event.target.value);
    };

    const handlePersonalize = () => {
        fetch(base_url + 'personalize', {
            credentials: 'include',
            method: 'POST'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                alert(data.message);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    };

    const handleRefinerChange = (event) => {
        setSelectedRefiner(event.target.value);
    };

    const handleLogout = () => {
        fetch(base_url + 'logout', {
            credentials: 'include',
            method: 'POST'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Reload the page after successful logout
                window.location.reload();
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    };


    useEffect(() => {
        // loadGallery();
        fetch(base_url + 'get_models', {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                let models = data.generic_models;
                if (selectedComponent === 'Txt2Img' && !models.includes('Lightning')) {
                    models = [...models, 'Lightning'];
                }
                setModelOptions(models);
                setSelectedModel(models[0]);
                setRefinerOptions(data.refiners);
            })
            .catch(error => console.error('Error:', error));
    }, [selectedComponent]);

    const loadGallery = () => {
        fetch(base_url + 'gallery', {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                const images = data.map(item => ({
                    name: item.image_name,
                    url: `data:image/jpeg;base64,${item.image}`
                }));
                setGalleryImages(images);
            })
            .catch(error => console.error('Error:', error));
    };

    const handleImageDelete = (imageName) => {
        setGalleryImages(prevImages => prevImages.filter(image => image.name !== imageName));
    };

    return (
        <div>
            <div className="toolbar flex justify-between px-4 py-2 bg-gray-500">
                <div className="flex justify-start space-x-4">
                    <button className={`px-4 py-2 text-white rounded hover:bg-gray-600 ${selectedComponent === 'Txt2Img' ? 'bg-gray-600' : 'bg-gray-700'}`} onClick={() => handleComponentChange('Txt2Img')}>Text to Image</button>
                    <button className={`px-4 py-2 text-white rounded hover:bg-gray-600 ${selectedComponent === 'Img2Img' ? 'bg-gray-600' : 'bg-gray-700'}`} onClick={() => handleComponentChange('Img2Img')}>Image to Image</button>
                    <button className={`px-4 py-2 text-white rounded hover:bg-gray-600 ${selectedComponent === 'Workspace' ? 'bg-gray-600' : 'bg-gray-700'}`} onClick={() => handleComponentChange('Workspace')}>Workspace</button>
                </div>
                <div className="flex justify-end space-x-4">
                    <span className="text-lg align-middle">Toggle personalization:</span>
                    <Switch checked={isPersonalizationEnabled} onChange={handleTogglePersonalization} />
                    <button className="px-4 py-2 text-white rounded hover:bg-gray-600 bg-gray-700" onClick={handlePersonalize} title="Click to begin training a personalized model based on the images found in your Galler. Warning may take quiet a while.">Personalize</button>
                    <span className="text-lg align-middle">Refiner:</span>
                    <Models options={refinerOptions} selectedOption={selectedRefiner} onOptionChange={handleRefinerChange} />
                    <span className="text-lg align-middle">Model:</span>
                    <Models options={modelOptions} selectedOption={selectedModel} onOptionChange={handleModelChange} />
                    <button className="px-4 py-2 text-white rounded hover:bg-gray-600 bg-gray-700" onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div style={{ paddingTop: '20px' }}>
                {selectedComponent === 'Txt2Img' && <Txt2Img selectedModel={selectedModel} selectedRefiner={selectedRefiner} isPersonalizationEnabled={isPersonalizationEnabled}/>}
                {selectedComponent === 'Img2Img' && <Img2Img selectedModel={selectedModel} selectedRefiner={selectedRefiner} isPersonalizationEnabled={isPersonalizationEnabled}/>}
                {selectedComponent === 'Workspace' && <Workspace />}
            </div>
            <div style={{ paddingTop: '20px' }}>
                <div className="pt-5 flex justify-center p-3">
                    <GetGallery onClick={loadGallery} />
                </div>
                <ImageGallery images={galleryImages} onImageDelete={handleImageDelete} />
            </div>
        </div>
    );
}