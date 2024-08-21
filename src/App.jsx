import React, { useState } from 'react';
import './App.css';
import { toPng, toSvg } from 'html-to-image';

const ComicBubbles = () => {
    const [text, setText] = useState('Type anything here......');
    const [topPosition, setTopPosition] = useState('top-left');
    const [bottomPosition, setBottomPosition] = useState('bottom-left');
    const [bgColor, setBgColor] = useState('white');
    const [textColor, setTextColor] = useState('black');
    const innerRef = useRef(null);

    const downloadAsPng = () => {
        if (innerRef.current === null) {
            return;
        }
        toPng(innerRef.current)
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = 'comic-bubble.png';
                link.click();
            })
            .catch((err) => {
                console.error('Could not generate PNG', err);
            });
    };

    const downloadAsSvg = () => {
        if (innerRef.current === null) {
            return;
        }
        toSvg(innerRef.current)
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = 'comic-bubble.svg';
                link.click();
            })
            .catch((err) => {
                console.error('Could not generate SVG', err);
            });
    };

    const applyBoxShadow = (color) => {
        const element = document.querySelector('.cbbl');
        element.style.boxShadow =
            `0 -3px ${color}, 0 -6px #000, 3px 0 ${color}, 3px -3px #000, 6px 0 #000, 0 3px ${color}, 0 6px #000, -3px 0 ${color}, -3px 3px #000, -6px 0 #000, -3px -3px #000, 3px 3px #000, 3px 9px rgba(0, 0, 0, 0.4), 6px 6px rgba(0, 0, 0, 0.4), 9px 3px rgba(0, 0, 0, 0.4)`;

        const style = document.createElement('style');
        style.type = 'text/css';

        const beforeRule = `.cbbl::before { content: ''; background-color: ${color}; }`;
        const afterRule = `.cbbl::after { content: ''; background-color: ${color};box-shadow: -3px 0 #000, 3px 0 #000, 3px 3px ${color}, 0px 3px #000, 6px 3px rgba(0, 0, 0, 0.4), 9px 3px rgba(0, 0, 0, 0.4), 3px 6px #000, 6px 6px #000, 9px 6px rgba(0, 0, 0, 0.4), 6px 9px rgba(0, 0, 0, 0.4); }`;
        const rightRule = `.cbbl.-up.-right::after { content: '';box-shadow: 3px 0 #000, -3px 0 #000, -3px -3px ${color}, 0px -3px #000,-6px -3px  rgba(0, 0, 0, 0.4), -3px -6px  rgba(0, 0, 0, 0.4), -6px -6px rgba(0, 0, 0, 0.4) }`;
        const rightAfterRule = `.cbbl.-right::after { content: '';box-shadow: 3px 0 #000, -3px 0 #000, -3px 3px ${color}, 0px 3px #000,-6px 3px #000, -3px 6px  rgba(0, 0, 0, 0.4), -6px 6px  rgba(0, 0, 0, 0.4), -3px 9px  rgba(0, 0, 0, 0.4), 0 6px  rgba(0, 0, 0, 0.4),3px 3px  rgba(0, 0, 0, 0.4), 6px 0px rgba(0, 0, 0, 0.4); }`;
        const rightUpAfterRule = `.cbbl.-up::after { content: '';box-shadow: -3px 0 #000, 3px 0 #000, 3px -3px ${color}, 0px -3px #000,6px -3px #000, 3px -6px  rgba(0, 0, 0, 0.4), 6px -6px  rgba(0, 0, 0, 0.4); }`;

        style.innerHTML = `${beforeRule} ${afterRule} ${rightRule} ${rightAfterRule} ${rightUpAfterRule}`;
        document.head.appendChild(style);
    };

    return (
        <div>
            <div className="main--container">
                <img style={{ height: 'auto', width: '70%' }} src="https://static-cdn.jtvnw.net/jtv_user_pictures/3e5142df-9d1c-41cb-a2b0-5742b7256be6-profile_image-300x300.png" />
                <h4 className="text--white">Write some text and click Create to make your own pixel speech bubble.</h4>
                <textarea
                    className="input--box"
                    placeholder="Type here.."
                    onChange={(e) => setText(e.target.value)}
                />

                <div className="m-4">
                    <label>
                        Spike Top:
                        <input
                            type="checkbox"
                            checked={topPosition === 'top-right'}
                            onChange={() => setTopPosition(topPosition === 'top-left' ? 'top-right' : 'top-left')}
                        />
                        {topPosition === 'top-left' ? 'Left' : 'Right'}
                    </label>
                </div>

                <div className="m-4">
                    <label>
                        Spike Bottom:
                        <input
                            type="checkbox"
                            checked={bottomPosition === 'bottom-right'}
                            onChange={() => setBottomPosition(bottomPosition === 'bottom-left' ? 'bottom-right' : 'bottom-left')}
                        />
                        {bottomPosition === 'bottom-left' ? 'Left' : 'Right'}
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
                </div>

                <div ref={innerRef}>
                    <div className={`inner`}>
                        <div
                            style={{
                                backgroundColor: bgColor,
                                color: textColor,
                            }}
                            className={`cbbl ${topPosition} ${bottomPosition}`}>
                            {text.split('\n').map((line, index) => (
                                <div key={index}>{line}</div>
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
