import { useEffect } from 'react';
import Head from 'next/head';
import { useQuery } from 'urql';
import gql from 'graphql-tag';
import MapComponnent from '../components/template/map';

const FEED_QUERY = gql`
    {
        entry(_size: 2) {
            data {
                name
            }
        }
    }
`;

function Map() {
    // const [result] = useQuery({ query: FEED_QUERY });
    // const { data, fetching, error } = result;
    // console.log('asd', data, error, fetching);
    // console.log('asd', data, error, fetching);
    // console.log('asd', data, error, fetching);
    // if (fetching) return <div>Fetching</div>;
    // if (error) return <div>Error</div>;
    useEffect(() => {
        async function getData() {
            const res = await fetch('/api/case');
            const newData = await res.json();
            console.log(newData);
            // setData(newData);
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
            <MapComponnent />
        </>
    );
}

export default Map;
