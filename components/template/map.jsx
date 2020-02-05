import dynamic from "next/dynamic";
import Sidebar from "../modules/sidebar";
import Flex from "../common/flex";
const OpenMap = dynamic(() => import("../client-side/OpenMap"), {
  ssr: false,
  loading: () => <p>daslkjjdaslkjdaslkdjas</p>
});

function MapTemplate() {
  return (
    <Flex css={{ height: "100%", width: "100%", position: "absolute" }}>
      <Sidebar />
      <OpenMap />
    </Flex>
  );
}

export default MapTemplate;
