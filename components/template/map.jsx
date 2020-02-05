import dynamic from "next/dynamic";
import Sidebar from "../modules/sidebar";
import Flex from "../common/flex";
const Main = dynamic(() => import("../modules/main"), {
  ssr: false,
  loading: () => <p>daslkjjdaslkjdaslkdjas</p>
});

function MapTemplate() {
  return (
    <Flex css={{ height: "100%", width: "100%", position: "absolute" }}>
      <Sidebar />
      <Main />
    </Flex>
  );
}

export default MapTemplate;
