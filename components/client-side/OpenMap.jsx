/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Map, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { useTheme } from 'emotion-theming';
import { useMemo } from 'react';

const defaultPosition = [30, 109];

const getRadius = count => {
    return Math.max(Math.log2(count) * 2, 5);
};

const createConfirmdMarker = (data = [], theme) => {
    return data.map(target => {
        const {
            Province_State,
            Country_Region,
            Lat,
            Long_,
            Confirmed,
            Deaths,
            Recovered,
        } = target;
        return (
            <CircleMarker
                key={`${Country_Region}_${Province_State}`}
                center={[Lat, Long_]}
                fillColor={theme.colors.fontColor4}
                stroke={false}
                fillOpacity={0.6}
                radius={getRadius(Confirmed)}
            >
                <Popup>
                    국가 : {Country_Region} <br />
                    {Province_State && (
                        <>
                            지역 : {Province_State}
                            <br />
                        </>
                    )}
                    감염 : {Confirmed}
                    <br />
                    사망 : {Deaths}
                    <br />
                    회복 : {Recovered}
                </Popup>
            </CircleMarker>
        );
    });
};

const OpenMap = props => {
    const theme = useTheme();
    const { data } = props;
    const marker = useMemo(() => {
        const { cases = {} } = data;
        return createConfirmdMarker(cases.data, theme);
    }, [data, theme]);
    return (
        <div
            css={{
                flex: 1,
                height: '100%',
            }}
        >
            <Map
                css={css`
                    height: 100%;
                    .leaflet-tile-pane {
                        filter: grayscale(1);
                    }
                `}
                center={defaultPosition}
                zoom={4}
                zoomControl={true}
                minZoom={3}
                maxZoom={18}
            >
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {marker}
            </Map>
        </div>
    );
};

export default OpenMap;
