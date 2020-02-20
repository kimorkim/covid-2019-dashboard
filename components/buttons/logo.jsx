/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const Logo = props => {
    return (
        <div
            css={theme => css`
                position: absolute;
                width: 40px;
                height: 40px;
                top: 16px;
                left: 16px;
                background-image: url(/images/logo.svg);
                cursor: pointer;
                ${theme.mq[1]} {
                    display: none;
                }
            `}
        />
    );
};

export default Logo;
