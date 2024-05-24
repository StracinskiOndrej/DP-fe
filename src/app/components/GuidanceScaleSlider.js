import React, { useState } from 'react';

export default function GuidanceScaleSlider({ onChange }) {
    const [sliderValue, setSliderValue] = useState(10);

    const handleSliderChange = (e) => {
        setSliderValue(e.target.value);
        onChange(e.target.value);
    };

    return (
        <div className="px-4 py-4">
            <input type="range" min="0" step="0.1" max="20" value={sliderValue} onChange={handleSliderChange} className="slider" />
            <p className="text-black" title="Determines how much effect the prompt has on the outcome. Higher values mean the AI follows the prompt more closely while lower values give more creativity. Recomended range is 5-15. 0 will make the AI nearly ignore the prompt.">Guidance scale: {sliderValue}</p>
        </div>
    );
}