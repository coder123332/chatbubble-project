// src/App.js
import React, { useState } from 'react';
import Canvas from './components/Canvas';
import Controls from './components/Controls';

function BubbleNew() {
    const [text, setText] = useState('Hello World!');
    const [bubbleType, setBubbleType] = useState('speech');

    return (
        <div>
            <h1>Pixel Speech Bubble Generator</h1>
            <Controls setText={setText} setBubbleType={setBubbleType} />
            <Canvas text={text} bubbleType={bubbleType} />
        </div>
    );
}

export default BubbleNew;
