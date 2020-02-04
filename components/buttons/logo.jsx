/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const Logo = props => {
  return (
    <div
      css={css`
        position: absolute;
        width: 40px;
        height: 40px;
        top: 16px;
        left: 16px;
        background-image: url(/images/logo.svg);
        cursor: pointer;
      `}
    />
  );
};

export default Logo;
