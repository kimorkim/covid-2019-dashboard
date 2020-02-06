/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarked } from "@fortawesome/free-solid-svg-icons";
import Button from "../common/button";

function Map() {
  return (
    <Button>
      <FontAwesomeIcon icon={faMapMarked} style={{ margin: "0 auto" }} />
      <span>지도</span>
    </Button>
  );
}

export default Map;
