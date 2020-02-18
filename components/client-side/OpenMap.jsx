/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import { Map, View, Feature, style } from 'ol';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import sourceVector from 'ol/source/Vector';
import {
    Circle as CircleStyle,
    Fill,
    Stroke,
    Style as olStyle,
} from 'ol/style';

import { useTheme } from 'emotion-theming';
import { useMemo, useEffect, useRef, useState } from 'react';

const defaultPosition = [129, 38];

const getRadius = count => {
    return Math.max(Math.log2(count) * 2, 5);
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

        const circle = new olStyle({
            image: new CircleStyle({
                stroke: new Stroke({
                    color: 'red',
                    width: 2,
                }),
                radius: getRadius(Confirmed),
                fill: new Fill({
                    color: theme.colors.fontColor4,
                }),
            }),
        });

        const circleFeature = new Feature({
            geometry: new Point(fromLonLat([Long_, Lat])),
            name: Confirmed,
            population: 4000,
            rainfall: 500,
        });
        circleFeature.setStyle(circle);
        return circleFeature;
    });
    const vectorSource = new sourceVector({
        features: features,
    });
    const vectorLayer = new VectorLayer({
        source: vectorSource,
    });
    map.addLayer(vectorLayer);
};
// var attributions =
//     '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
//     '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

const OpenMap = props => {
    const theme = useTheme();
    const mapEl = useRef(null);
    const [olMap, setOlMap] = useState();

    useEffect(() => {
        const map = new Map({
            layers: [
                new TileLayer({
                    source: new OSM({
                        // attributions,
                    }),
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

        map.on('click', function(evt) {
            var feature = map.forEachFeatureAtPixel(evt.pixel, function(
                feature
            ) {
                return feature;
            });

            if (feature) {
                alert(feature.get('name'));
            }
        });

        map.on('pointermove', function(e) {
            if (!e.dragging) {
                var pixel = map.getEventPixel(e.originalEvent);
                var hit = map.hasFeatureAtPixel(pixel);
                map.getTarget().style.cursor = hit ? 'pointer' : '';
            }
        });
        return () => {};
    }, [mapEl, setOlMap]);
    const { data } = props;
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
            <div id="marker">asd</div>
        </>
    );
};

export default OpenMap;
