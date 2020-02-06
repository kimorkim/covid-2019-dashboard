/** @jsx jsx */
import { jsx } from "@emotion/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import Button from "../common/button";

function Chart() {
  return (
    <Button>
      <FontAwesomeIcon icon={faChartLine} style={{ margin: "0 auto" }} />
      <span>지표</span>
    </Button>
  );
}

export default Chart;
