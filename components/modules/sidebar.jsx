import styled from "@emotion/styled";
import Logo from "../buttons/logo";
import MapButton from "../buttons/map";
import ChartButton from "../buttons/chart";
import Flex from "../common/flex";
import { useTheme } from "emotion-theming";

const Wrapper = styled.div`
  width: 72px;
  height: 100%;
`;

function Sidebar() {
  const theme = useTheme();
  return (
    <Flex
      css={{
        width: "72px",
        height: "100%",
        background: theme.colors.bgColor1,
        justifyContent: "center",
        flexDirection: "column",
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 3px 0px"
      }}
    >
      <Logo />
      <MapButton />
      <ChartButton />
    </Flex>
  );
}

export default Sidebar;
