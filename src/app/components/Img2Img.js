import React, { useState } from 'react';
import PromptField from './PromptField';
import ImageUpload from './ImageUpload';
import GenerateButton from './GenerateButton';
import CurrentImage from './CurrentImage';
import NegativeField from "@/app/components/NegativeField";
import SaveToGalleryButton from './SaveToGalleryButton';
import GuidanceScaleSlider from './GuidanceScaleSlider';
import StrengthSlider from "@/app/components/StrengthSlider";
import ImageNumSlider from "@/app/components/ImageNumSlider";
import config from '../config';

const base_url = config.baseUrl;

export default function Img2Img({ selectedModel, selectedRefiner, isPersonalizationEnabled }) {
    const [promptText, setPromptText] = useState('');
    const [negativeText, setNegativeText] = useState('');
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('https://via.placeholder.com/528x528/808080/808080'); // Set default image URL
    const [imageName, setImageName] = useState('');
    const [guidanceSliderValue, setGuidanceSliderValue] = useState(10);
    const [strengthSliderValue, setStrengthSliderValue] = useState(0.5);
    // const [imageNumSliderValue, setImageNumSliderValue] = useState(1);



    const handlePromptTextChange = (e) => {
        setPromptText(e.target.value);
    };

    const handleNegativeTextChange = (e) => {
        setNegativeText(e.target.value);
    };
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleGuidanceSliderChange = (value) => {
        setGuidanceSliderValue(value); // Update the slider value state
    };

    const handleStrengthSliderChange = (value) => {
        setStrengthSliderValue(value); // Update the slider value state
    };

    // const handleImageNumSliderChange = (value) => {
    //     setImageNumSliderValue(value); // Update the slider value state
    // };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('prompt', promptText);
        formData.append('negative', negativeText);
        formData.append('image', file);
        formData.append('guidance_scale', guidanceSliderValue.toString());
        formData.append('strength', strengthSliderValue.toString());
        formData.append('model', selectedModel);
        formData.append('refiner', selectedRefiner);
        formData.append('personalized', isPersonalizationEnabled);
        // formData.append('img_num', imageNumSliderValue.toString());

        fetch(base_url + 'img2img', {
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

    return (
        <div className="flex flex-col items-center pl-40 h-9/10">
            <div className="flex space-x-4 h-128">
                <div className="flex flex-col space-y-4 h-128 w-64">
                    <PromptField value={promptText} onChange={handlePromptTextChange} className="w-full h-full" />
                    <NegativeField value={negativeText} onChange={handleNegativeTextChange} className="w-full h-full" />
                    <GuidanceScaleSlider onChange={handleGuidanceSliderChange}/>
                    <StrengthSlider onChange={handleStrengthSliderChange}/>
                    {/*<ImageNumSlider onChange={handleImageNumSliderChange}/>*/}
                </div>
                <CurrentImage imageUrl={imageUrl} className="w-64 h-64 bg-gray-500" />
                <ImageUpload onChange={handleFileChange} />
            </div>
            <div className="flex space-x-4">
                <GenerateButton onClick={handleSubmit} text="Generate"/>
                <SaveToGalleryButton onClick={handleSaveToGallery}/>
            </div>
        </div>
    );
}