import React, { useRef, useState } from "react";
import Navbar from './components/Navbar';
import "./App.css";
import { toPng, toSvg } from 'html-to-image';

const ComicBubbles = () => {

  const [text, setText] = useState('Type anything here......');
  const [position, setPosition] = useState('bottom');
  const [bgColor, setBgColor] = useState('white');
  const [textColor, setTextColor] = useState('black');
  const [fontFamily, setFontFamily] = useState('Minecraft');
  const [capsLock, setCapsLock] = useState(false);

  const innerRef = useRef(null);

  const downloadAsPng = () => {
    if (innerRef.current === null) {
      return;
    }
    const clone = innerRef.current.cloneNode(true);
    const bubble = clone.querySelector('.cbbl');
    if (bubble) {
      const prefixed = `Yungfika.com ${text}`;
      bubble.innerHTML = prefixed
        .split('\n')
        .map((l) => `<div>${capsLock ? l.toUpperCase() : l}</div>`) 
        .join('');
    }
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    document.body.appendChild(clone);
    toPng(clone)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'comic-bubble.png';
        link.click();
        document.body.removeChild(clone);
      })
      .catch((err) => {
        document.body.removeChild(clone);
        console.error('Could not generate PNG', err);
      });
  };

  const downloadAsSvg = () => {
    if (innerRef.current === null) {
      return;
    }
    const clone = innerRef.current.cloneNode(true);
    const bubble = clone.querySelector('.cbbl');
    if (bubble) {
      const prefixed = `Yungfika.com ${text}`;
      bubble.innerHTML = prefixed
        .split('\n')
        .map((l) => `<div>${capsLock ? l.toUpperCase() : l}</div>`) 
        .join('');
    }
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    document.body.appendChild(clone);
    toSvg(clone)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'comic-bubble.svg';
        link.click();
        document.body.removeChild(clone);
      })
      .catch((err) => {
        document.body.removeChild(clone);
        console.error('Could not generate SVG', err);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setText((prevText) => prevText + "\n"); // Add a newline character to the text
    }
  };

  const applyBoxShadow = (color) => {
    const element = document.querySelector('.cbbl');
    element.style.boxShadow =
      `0 -3px ${color}, 0 -6px #000, 3px 0 ${color}, 3px -3px #000, 6px 0 #000, 0 3px ${color}, 0 6px #000, -3px 0 ${color}, -3px 3px #000, -6px 0 #000, -3px -3px #000, 3px 3px #000, 3px 9px rgba(0, 0, 0, 0.4), 6px 6px rgba(0, 0, 0, 0.4), 9px 3px rgba(0, 0, 0, 0.4)`;

    const style = document.createElement('style');
    style.type = 'text/css';

    const beforeRule = `.cbbl::before { content: ''; background-color: ${color}; }`;
    const afterRule = `.cbbl::after { content: ''; background-color: ${color};box-shadow: -3px 0 #000, 3px 0 #000, 3px 3px ${color}, 0px 3px #000, 6px 3px rgba(0, 0, 0, 0.4), 9px 3px rgba(0, 0, 0, 0.4), 3px 6px #000, 6px 6px #000, 9px 6px rgba(0, 0, 0, 0.4), 6px 9px rgba(0, 0, 0, 0.4); }`;
    const rightRule = `.cbbl.-up.-right::after { content: '';box-shadow: 3px 0 #000, -3px 0 #000, -3px -3px ${color}, 0px -3px #000,-6px -3px rgba(0, 0, 0, 0.4), -3px -6px rgba(0, 0, 0, 0.4), -6px -6px rgba(0, 0, 0, 0.4) }`;
    const rightAfterRule = `.cbbl.-right::after { content: '';box-shadow: 3px 0 #000, -3px 0 #000, -3px 3px ${color}, 0px 3px #000,-6px 3px #000, -3px 6px rgba(0, 0, 0, 0.4), -6px 6px rgba(0, 0, 0, 0.4), -3px 9px rgba(0, 0, 0, 0.4), 0 6px rgba(0, 0, 0, 0.4),3px 3px rgba(0, 0, 0, 0.4), 6px 0px rgba(0, 0, 0, 0.4); }`;
    const rightUpAfterRule = `.cbbl.-up::after { content: '';box-shadow: -3px 0 #000, 3px 0 #000, 3px -3px ${color}, 0px -3px #000,6px -3px #000, 3px -6px rgba(0, 0, 0, 0.4), 6px -6px rgba(0, 0, 0, 0.4); }`;

    style.innerHTML = `${beforeRule} ${afterRule} ${rightRule} ${rightAfterRule} ${rightUpAfterRule}`;
    document.head.appendChild(style);
  };

  const quotedFont = fontFamily.includes(' ') ? `'${fontFamily}'` : fontFamily;

  return (
    <div>
      <p className="beta-note">This software is still in beta.</p>
      <Navbar />
      <div className="main--container">
        <h4 className="text--white">Write some text and click Create to make your own pixel speech bubble.</h4>
        <textarea
          onKeyDown={handleKeyDown}
          className="input--box"
          placeholder="Type here.."
          onChange={(e) => setText(e.target.value)}
        />

        <div className="m-4">
          <label>
            Spike Top left
            <input checked={position === 'top-right'} type="radio" onChange={() => setPosition('top-right')} />
          </label>
          <label>
            Spike Top right
            <input checked={position === 'top-left'} type="radio" onChange={() => setPosition('top-left')} />
          </label>
        </div>
        <div>
          <label>
            Bottom left
            <input checked={position === 'bottom-left'} type="radio" onChange={() => setPosition('bottom-left')} />
          </label>
          <label>
            Bottom right
            <input checked={position === 'bottom-right'} type="radio" onChange={() => setPosition('bottom-right')} />
          </label>
        </div>

        <div className="color-con">
          <div className="m-4">
            <p className="text--black">Background color</p>
            <input type="color" onChange={(e) => {
              setBgColor(e.target.value);
              applyBoxShadow(e.target.value);
            }} />
          </div>
          <div className="m-4">
            <p className="text--black">Text color</p>
            <input type="color" onChange={(e) => setTextColor(e.target.value)} />
          </div>
          <div className="m-4">
            <p className="text--black">Font</p>
            <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
              <option value="Minecraft">Minecraft</option>
              <option value="Press Start 2P">Press Start 2P</option>
              <option value="Courier New">Courier New</option>
            </select>
          </div>
          <div className="m-4">
            <p className="text--black">Caps Lock</p>
            <input type="checkbox" checked={capsLock} onChange={(e) => setCapsLock(e.target.checked)} />
          </div>
        </div>

        <div ref={innerRef}>
          <div className={`inner`}>
            <div
              style={{
                backgroundColor: bgColor,
                color: textColor,
                fontFamily: quotedFont,
              }}
              className={`cbbl ${position === 'top-right' ? '-right -up' : position === 'top-left' ? '-up ' : position === 'bottom-right' ? '' : position === 'bottom-left' ? '-right' : ''}`}>
              {text.split('\n').map((line, index) => (
                <div key={index}>{capsLock ? line.toUpperCase() : line}</div>
              ))}
            </div>
          </div>

          <div>
            <p>    </p>
          </div>
        </div>

        <div className="download--button">
          <button onClick={downloadAsPng}>Download PNG</button>
          <button onClick={downloadAsSvg}>Download SVG</button>
        </div>
      </div>
    </div>
  );
};

export default ComicBubbles;
