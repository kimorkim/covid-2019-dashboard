/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const Button = props => {
  return (
    <div
      css={theme => {
        return css`
          display: flex;
          justify-content: center;
          flex-direction: column;
          width: 72px;
          height: 72px;
          text-align: center;
          cursor: pointer;
          user-select: none;
          &:hover {
            background: ${theme.colors.bgColor2};
          }
        `;
      }}
      {...props}
    />
  );
};

export default Button;
