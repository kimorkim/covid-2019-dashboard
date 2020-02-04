/** @jsx jsx */
import { jsx } from "@emotion/core";

const Wrapper = props => {
  return (
    <div
      css={{
        position: "absolute",
        display: "flex"
      }}
      {...props}
    />
  );
};

function Flex(props) {
  return <Wrapper css={props.css}>{props.children}</Wrapper>;
}

export default Flex;
