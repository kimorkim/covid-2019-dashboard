/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import { Map, View, Feature, style } from 'ol';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import {
    Circle as CircleStyle,
    Fill as FillStyle,
    Stroke as StrokeStyle,
    Style as OlStyle,
} from 'ol/style';
import { useTheme } from 'emotion-theming';
import { useEffect, useRef, useState } from 'react';
import Popup from './popup';

const defaultPosition = [129, 38];

const getRadius = count => {
    return Math.max(Math.log2(count) * 2, 3);
};

/*eslint camelcase: ["error", {allow: ["Province_State", "Country_Region"]}]*/
const createConfirmdMarker = (map, data = [], theme) => {
    const features = data.map(target => {
        const {
            Province_State,
            Country_Region,
            Lat,
            Long_,
            Confirmed,
            Deaths,
            Recovered,
        } = target;

        const circleFeature = new Feature({
            geometry: new Point(fromLonLat([Long_, Lat])),
            content: `
                    국가 : ${Country_Region} <br />
                    ${
                        Province_State
                            ? `지역 : ${Province_State}
                            <br />`
                            : ''
                    }
                    감염 : ${Confirmed}
                    <br />
                    사망 : ${Deaths}
                    <br />
                    회복 : ${Recovered}`,
        });

        circleFeature.setStyle(
            new OlStyle({
                image: new CircleStyle({
                    stroke: new StrokeStyle({
                        color: 'red',
                        width: 2,
                    }),
                    radius: getRadius(Confirmed),
                    fill: new FillStyle({
                        color: theme.colors.fontColor4,
                    }),
                }),
            })
        );

        return circleFeature;
    });
    map.addLayer(
        new VectorLayer({
            source: new VectorSource({
                features,
            }),
        })
    );
};

const OpenMap = ({ data }) => {
    const theme = useTheme();
    const mapEl = useRef(null);
    const [olMap, setOlMap] = useState();
    const [popup, setPopup] = useState();

    useEffect(() => {
        const map = new Map({
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            target: mapEl.current,
            view: new View({
                center: fromLonLat(defaultPosition),
                zoom: 3,
                minZoom: 2,
                maxZoom: 19,
            }),
        });
        setOlMap(map);
    }, [mapEl, setOlMap, setPopup]);

    useEffect(() => {
        if (olMap && popup) {
            olMap.addOverlay(popup);

            const pointEvent = e => {
                if (!e.dragging) {
                    var pixel = olMap.getEventPixel(e.originalEvent);
                    var hit = olMap.hasFeatureAtPixel(pixel);
                    olMap.getTarget().style.cursor = hit ? 'pointer' : '';
                }
            };

            olMap.on('pointermove', pointEvent);
            return () => {
                olMap.removeOverlay(popup);
                olMap.removeEventListener('pointermove', pointEvent);
            };
        }
    }, [olMap, popup]);

    useEffect(() => {
        if (olMap) {
            const { cases = {} } = data;
            createConfirmdMarker(olMap, cases.data, theme);
        }
    }, [olMap, data, theme]);

    return (
        <>
            <div
                css={{
                    flex: 1,
                    height: '100%',
                }}
                ref={mapEl}
            ></div>
            <Popup onLoad={setPopup} olMap={olMap} />
        </>
    );
};

export default OpenMap;
