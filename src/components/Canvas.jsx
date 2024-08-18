// src/components/Canvas.js
import React, { useRef, useEffect } from 'react';

const Canvas = ({ text, bubbleType }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Set styles
        ctx.fillStyle = '#000';
        ctx.font = '20px PixelFont';
        
        // Draw bubble
        if (bubbleType === 'speech') {
            // Draw speech bubble logic here
        } else {
            // Draw thought bubble logic here
        }

        // Draw text
        ctx.fillText(text, 50, 50); // Position text on the canvas

    }, [text, bubbleType]);

    return <canvas ref={canvasRef} width={400} height={400} />;
};

export default Canvas;
