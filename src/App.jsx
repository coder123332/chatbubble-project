import React, { useRef, useState } from "react";
import "./App.css";
import { toPng, toSvg } from 'html-to-image';

// ComicBubbles Component
const ComicBubbles = () => {
  const [text, setText] = useState('Type anything here......');
  const [position, setPosition] = useState('bottom');
  const [bgColor, setBgColor] = useState('white');
  const [textColor, setTextColor] = useState('black');
  const innerRef = useRef(null);

  const downloadAsPng = () => {
    if (innerRef.current === null) return;
    toPng(innerRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'comic-bubble.png';
        link.click();
      })
      .catch((err) => console.error('Could not generate PNG', err));
  };

  const downloadAsSvg = () => {
    if (innerRef.current === null) return;
    toSvg(innerRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'comic-bubble.svg';
        link.click();
      })
      .catch((err) => console.error('Could not generate SVG', err));
  };

  return (
    <div>
      <div className="main--container">
        {/* ComicBubbles JSX here */}
      </div>
    </div>
  );
};

// BoxLogoGenerator Component
const BoxLogoGenerator = () => {
  const [textColor, setTextColor] = useState('#000000');
  const [frameColor, setFrameColor] = useState('#000000');
  const [imageSrc, setImageSrc] = useState([]);

  const setColors = (textColor, frameColor) => {
    setTextColor(textColor);
    setFrameColor(frameColor);
  };

  const generateImage = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await fetch('/generate', {
      method: 'POST',
      body: formData,
    });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    setImageSrc((prevImages) => [url, ...prevImages]);
  };

  return (
    <div>
      <h1>Enter text to generate image:</h1>
      <form onSubmit={generateImage}>
        <input type="text" name="text" required />
        <div>
          <label htmlFor="text_color">Text Color:</label>
          <input
            type="color"
            id="text_color"
            name="text_color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="frame_color">Frame Color:</label>
          <input
            type="color"
            id="frame_color"
            name="frame_color"
            value={frameColor}
            onChange={(e) => setFrameColor(e.target.value)}
          />
        </div>
        <div>
          <button type="button" onClick={() => setColors('#000000', '#000000')}>
            Set Black
          </button>
          <button type="button" onClick={() => setColors('#FF0000', '#FF0000')}>
            Set Red
          </button>
        </div>
        <input type="submit" />
      </form>
      <div id="image-container">
        {imageSrc.map((src, index) => (
          <div key={index}>
            <img src={src} alt={`Generated ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

// App Component to Render Both
const App = () => {
  return (
    <div>
      <ComicBubbles />
      <BoxLogoGenerator />
    </div>
  );
};

export default App;
