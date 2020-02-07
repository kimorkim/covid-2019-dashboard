import { useEffect } from "react";
import Head from "next/head";
import MapComponnent from "../components/template/map";

function Map() {
  useEffect(() => {
    async function getData() {
      const res = await fetch("/api");
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
          charset="UTF-8"
          href="/css/leaflet.css"
        />
      </Head>
      <MapComponnent />
    </>
  );
}

export default Map;
