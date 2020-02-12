/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Flex from '../common/flex';
import { useTheme } from 'emotion-theming';
import { useMemo } from 'react';

const getTotal = ({ cases = {} }) => {
    const { data = [] } = cases;
    return data.reduce(
        (acc, item) => {
            acc[0] += item.confirmed;
            acc[1] += item.deaths;
            acc[2] += item.recovered;
            return acc;
        },
        [0, 0, 0]
    );
};

const Overview = props => {
    const theme = useTheme();
    const { dailyCase } = props;
    const [total, deaths, recovered] = useMemo(() => getTotal(dailyCase), [
        dailyCase,
    ]);
    return (
        <Flex
            css={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '300px',
                height: '100%',
                background: theme.colors.bgColor3,
                justifyContent: 'center',
                flexDirection: 'column',
                boxShadow: 'rgba(0, 0, 0, 0.25) 0px 1px 3px 0px',
            }}
        >
            <div
                css={css`
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
                <span>확진</span>
            </div>
            <div
                css={css`
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
                css={css`
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
                <span>완치</span>
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
