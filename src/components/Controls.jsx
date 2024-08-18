// src/components/Controls.js
import React from 'react';

const Controls = ({ setText, setBubbleType }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Enter your text"
                onChange={(e) => setText(e.target.value)}
            />
            <select onChange={(e) => setBubbleType(e.target.value)}>
                <option value="speech">Speech Bubble</option>
                <option value="thought">Thought Bubble</option>
            </select>
        </div>
    );
};

export default Controls;
