/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Map, TileLayer } from "react-leaflet";

const position = [30, 109];
const Main = () => {
  return (
    <div
      css={{
        flex: 1,
        height: "100%"
      }}
    >
      <Map
        css={{ height: "100%", filter: "grayscale(1)" }}
        center={position}
        zoom={4}
        zoomControl={true}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </Map>
    </div>
  );
};

export default Main;
