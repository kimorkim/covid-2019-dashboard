import styled from "@emotion/styled";
import Sidebar from "../modules/sidebar";
import Flex from "../common/flex";

function Map() {
  return (
    <Flex css={{ height: "100%" }}>
      <Sidebar />
      <div>map</div>
    </Flex>
  );
}

export default Map;
