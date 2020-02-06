import Head from "next/head";
import MapComponnent from "../components/template/map";

function Map() {
  return (
    <>
      <Head>
        <link
          type="text/css"
          rel="stylesheet"
          charset="UTF-8"
          href="/css/leaflet.css"
        />
      </Head>
      <MapComponnent />
    </>
  );
}

export default Map;
