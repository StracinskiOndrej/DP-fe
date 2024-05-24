import React, { useState } from 'react';

export default function imageNumSlider({ onChange }) {
    const [sliderValue, setSliderValue] = useState(1);

    const handleSliderChange = (e) => {
        setSliderValue(e.target.value);
        onChange(e.target.value);
    };

    return (
        <div className="px-4 py-4">
            <input type="range" min="1" step="1" max="5" value={sliderValue} onChange={handleSliderChange} className="slider" />
            <p className="text-black" title="Number of iamges to generate.">Number of images: {sliderValue}</p>
        </div>
    );
}