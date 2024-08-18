import React, { useState } from 'react';

const BoxLogoGenerator = () => {
    const [userText, setUserText] = useState('');
    const [textColor, setTextColor] = useState('#000000');
    const [frameColor, setFrameColor] = useState('#000000');
    const [isItalic, setIsItalic] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);

    const setColors = (textColor, frameColor) => {
        setTextColor(textColor);
        setFrameColor(frameColor);
    };

    const generateImage = (event) => {
        event.preventDefault();

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        ctx.font = `${isItalic ? 'italic ' : ''}bold 20px Arial`;
        const textWidth = ctx.measureText(userText).width;

        canvas.width = textWidth + 20; // Extra space for the border
        canvas.height = 50; // Height of the text box

        // Set background color to pink
        ctx.fillStyle = '#ff69b4';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the text
        ctx.fillStyle = textColor;
        ctx.fillText(userText, 10, 30); // 10 padding left, 30 from top

        // Draw the border
        ctx.strokeStyle = frameColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

        // Generate the image URL
        const url = canvas.toDataURL('image/png');
        setImageSrc(url);
    };

    return (
        <div>
            <h1>Enter text to generate image:</h1>
            <form onSubmit={generateImage}>
                <input
                    type="text"
                    value={userText}
                    onChange={(e) => setUserText(e.target.value)}
                    placeholder="Enter your text here"
                    required
                />
                <div>
                    <label htmlFor="textColor">Text Color:</label>
                    <input
                        type="color"
                        id="textColor"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="frameColor">Frame Color:</label>
                    <input
                        type="color"
                        id="frameColor"
                        value={frameColor}
                        onChange={(e) => setFrameColor(e.target.value)}
                    />
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={isItalic}
                            onChange={(e) => setIsItalic(e.target.checked)}
                        /> Use Italic Font
                    </label>
                </div>
                <div>
                    <button type="button" onClick={() => setColors('#000000', '#000000')}>Set Black</button>
                    <button type="button" onClick={() => setColors('#FF0000', '#FF0000')}>Set Red</button>
                </div>
                <input type="submit" value="Generate Image" />
            </form>
            <div id="image-container">
                {imageSrc && (
                    <>
                        <img src={imageSrc} alt="Generated" />
                        <a href={imageSrc} download="text-image.png" className="btn">Download PNG</a>
                    </>
                )}
            </div>
        </div>
    );
};

export default BoxLogoGenerator;
