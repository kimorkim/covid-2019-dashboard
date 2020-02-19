/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect, useRef, useState } from 'react';
import Overlay from 'ol/Overlay';

const setOverlayContent = (overlay, content) => {
    const { element } = overlay;
    const dom = element.querySelector('#popup-content');
    dom.innerHTML = content;
};

const popup = ({ onLoad, olMap }) => {
    const popupEl = useRef(null);
    const [overlay, setOverlay] = useState(overlay);

    useEffect(() => {
        const clickEvnet = evt => {
            var feature = olMap.forEachFeatureAtPixel(
                evt.pixel,
                feature => feature
            );
            if (feature) {
                setOverlayContent(overlay, feature.get('content'));
                overlay.setPosition(evt.coordinate);
            } else {
                overlay.setPosition(undefined);
            }
        };

        if (olMap) {
            olMap.on('click', clickEvnet);
            return () => {
                olMap.removeEventListener('click', clickEvnet);
            };
        }
    }, [olMap, overlay]);

    useEffect(() => {
        const overlay = new Overlay({
            element: popupEl.current,
            autoPan: true,
            autoPanAnimation: {
                duration: 250,
            },
        });
        setOverlay(overlay);
        onLoad(overlay);
    }, [popupEl]);

    const handleClick = e => {
        e.target.blur();
        overlay.setPosition(undefined);
        return false;
    };

    return (
        <div
            id="popup"
            css={css`
                position: absolute;
                background-color: white;
                box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
                padding: 15px;
                border-radius: 10px;
                border: 1px solid #cccccc;
                bottom: 12px;
                left: -50px;
                min-width: 280px;

                &:after,
                &:before {
                    top: 100%;
                    border: solid transparent;
                    content: ' ';
                    height: 0;
                    width: 0;
                    position: absolute;
                    pointer-events: none;
                }

                &:after {
                    border-top-color: white;
                    border-width: 10px;
                    left: 48px;
                    margin-left: -10px;
                }

                &:before {
                    border-top-color: #cccccc;
                    border-width: 11px;
                    left: 48px;
                    margin-left: -11px;
                }
            `}
            ref={popupEl}
        >
            <a
                href="#"
                id="popup-closer"
                css={css`
                    text-decoration: none;
                    position: absolute;
                    top: 2px;
                    right: 8px;

                    &:after {
                        content: '✖';
                    }
                `}
                onClick={handleClick}
            ></a>
            <div id="popup-content"></div>
        </div>
    );
};

export default popup;
