/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Flex from '../common/flex';
import { useMemo } from 'react';

const getTotal = ({ cases = {} }) => {
    const { data = [] } = cases;
    return data.reduce(
        (acc, item) => {
            acc[0] += item.Confirmed;
            acc[1] += item.Deaths;
            acc[2] += item.Recovered;
            return acc;
        },
        [0, 0, 0]
    );
};

const Overview = props => {
    const { data } = props;
    const [total, deaths, recovered] = useMemo(() => getTotal(data), [data]);
    return (
        <Flex
            css={theme => css`
                position: absolute;
                top: 0;
                right: 0;
                width: 300px;
                height: 100%;
                background: ${theme.colors.bgColor3};
                justify-content: center;
                flex-direction: column;
                box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 3px 0px;
                transform: translate3d(0px, 0px, 0px);
                z-index: 1000;
                will-change: auto;
                ${theme.mq[1]} {
                    display: none;
                },
            `}
        >
            <div
                css={theme => css`
                    margin: 10px 0;
                    text-align: center;
                    color: ${theme.colors.fontColor1};
                `}
            >
                <div
                    css={css`
                        font-size: 4.5em;
                        font-weight: bold;
                    `}
                >
                    {total}
                </div>
                <span>감염</span>
            </div>
            <div
                css={theme => css`
                    margin: 10px 0;
                    text-align: center;
                    color: ${theme.colors.fontColor2};
                `}
            >
                <div
                    css={css`
                        font-size: 2em;
                        font-weight: bold;
                    `}
                >
                    {deaths}
                </div>
                <span>사망</span>
            </div>
            <div
                css={theme => css`
                    margin: 10px 0;
                    text-align: center;
                    color: ${theme.colors.fontColor3};
                `}
            >
                <div
                    css={css`
                        font-size: 2em;
                        font-weight: bold;
                    `}
                >
                    {recovered}
                </div>
                <span>회복</span>
            </div>
            <div
                css={css`
                    flex: 1;
                `}
            />
        </Flex>
    );
};

export default Overview;
