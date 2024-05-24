import React, { useState } from 'react';

export default function StrengthSlider({ onChange }) {
    const [sliderValue, setSliderValue] = useState(0.5);

    const handleSliderChange = (e) => {
        setSliderValue(e.target.value);
        onChange(e.target.value);
    };

    return (
        <div className="p-4">
            <input type="range" min="0" step="0.01" max="1" value={sliderValue} onChange={handleSliderChange} className="slider" />
            <p className="text-black" title="Determines how closely the AI follows the uploaded image. Higher values give the model more creativity. A value of 1 basically ignores the original image.">Strength: {sliderValue}</p>
        </div>
    );
}