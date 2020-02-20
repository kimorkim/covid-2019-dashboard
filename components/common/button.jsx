/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const Button = props => {
    return (
        <div
            css={theme => {
                return css`
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    width: 50px;
                    height: 50px;
                    text-align: center;
                    cursor: pointer;
                    user-select: none;
                    &:hover {
                        background: ${theme.colors.bgColor2};
                    }
                    margin: 10px auto;
                    ${theme.mq[1]} {
                        margin: 0 20px;
                        padding: 5px;
                    }
                `;
            }}
            {...props}
        />
    );
};

export default Button;
