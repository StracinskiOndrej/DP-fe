import React, { useState } from 'react';
import PromptField from './PromptField';
import GenerateButton from './GenerateButton';
import CurrentImage from './CurrentImage';
import NegativeField from "@/app/components/NegativeField";
import SaveToGalleryButton from './SaveToGalleryButton';
import GuidanceScaleSlider from './GuidanceScaleSlider';
import ImageNumSlider from './ImageNumSlider';
import config from '../config';

const base_url = config.baseUrl;
var curr_image_name = '';
var curr_image_base64 = '';

export default function Txt2Img({ selectedModel, selectedRefiner, isPersonalizationEnabled }) {
    const [promptText, setPromptText] = useState('');
    const [negativeText, setNegativeText] = useState('');
    const [imageUrl, setImageUrl] = useState('https://via.placeholder.com/528x528/808080/808080');
    const [imageName, setImageName] = useState('');
    const [sliderValue, setSliderValue] = useState(10);
    // const [imageNumSliderValue, setImageNumSliderValue] = useState(1);


    const handlePromptTextChange = (e) => {
        setPromptText(e.target.value);
    };

    const handleNegativeTextChange = (e) => {
        setNegativeText(e.target.value);
    };

    const handleSliderChange = (value) => {
        setSliderValue(value);
    };

    // const handleImageNumSliderChange = (value) => {
    //     setImageNumSliderValue(value); // Update the slider value state
    // };


    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('prompt', promptText);
        formData.append('negative', negativeText);
        formData.append('guidance_scale', sliderValue.toString());
        formData.append('model', selectedModel);
        formData.append('refiner', selectedRefiner);
        formData.append('personalized', isPersonalizationEnabled);


        fetch(base_url + 'txt2img', {
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
                curr_image_name = data.image_name;
                const imageBase64 = data.image;
                const imgUrl = "data:image/jpeg;base64," + imageBase64;
                curr_image_base64 = data.image;
                setImageUrl(imgUrl);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    };


    const handleSaveToGallery = () => {
        const formData = new FormData();
        formData.append('image_name', curr_image_name);
        formData.append('image', curr_image_base64);

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
            <div className="flex space-x-4 h-[40vh]">
                <div className="flex flex-col space-y-4 h-128 w-64">
                    <PromptField value={promptText} onChange={handlePromptTextChange} className="w-full h-full"/>
                    <NegativeField value={negativeText} onChange={handleNegativeTextChange} className="w-full h-full"/>
                    <GuidanceScaleSlider onChange={handleSliderChange}/>
                    {/*<ImageNumSlider onChange={handleImageNumSliderChange}/>*/}
                </div>
                <CurrentImage imageName={imageName} imageUrl={imageUrl} className="w-64 h-64 bg-gray-500"/>
            </div>
            <div className="flex space-x-4">
                <GenerateButton onClick={handleSubmit} text="Generate"/>
                <SaveToGalleryButton onClick={handleSaveToGallery}/>
            </div>
        </div>
    );
}