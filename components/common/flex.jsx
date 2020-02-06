/** @jsx jsx */
import { jsx } from "@emotion/core";

const Flex = props => {
  const { css, children, ...others } = props;
  return (
    <div
      css={{
        display: "flex",
        ...css
      }}
      {...others}
    >
      {children}
    </div>
  );
};

export default Flex;
