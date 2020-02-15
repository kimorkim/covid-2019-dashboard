import { useEffect } from 'react';
import Head from 'next/head';
import MapDashboard from '../components/template/mapDashboard';

function Map() {
    useEffect(() => {
        async function getData() {
            const res = await fetch('/api/case');
            const newData = await res.json();
        }
        getData();
    }, []);
    return (
        <>
            <Head>
                <link
                    type="text/css"
                    rel="stylesheet"
                    charSet="UTF-8"
                    href="/css/leaflet.css"
                />
            </Head>
            <MapDashboard />
        </>
    );
}

export default Map;
