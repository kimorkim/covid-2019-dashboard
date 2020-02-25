/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import dynamic from 'next/dynamic';
import { useQuery } from 'urql';
import gql from 'graphql-tag';
import Menu from '../modules/menu';
import Overview from '../modules/overview';
import Flex from '../common/flex';
const OpenMap = dynamic(() => import('../client-side/OpenMap'), {
    ssr: false,
    loading: () => <p>loading</p>,
});

const DAILY_CASE_QUERY = gql`
    {
        latestDailyCase(_size: 1) {
            data {
                name
                cases(_size: 250) {
                    data {
                        Province_State
                        Country_Region
                        Last_Update
                        Lat
                        Long_
                        Confirmed
                        Deaths
                        Recovered
                    }
                }
            }
        }
    }
`;

function MapDashboard() {
    const [result] = useQuery({ query: DAILY_CASE_QUERY });
    const { data, fetching, error } = result;
    if (fetching) return <div>Fetching</div>;
    if (error) return <div>Error</div>;
    if (!data || !data.latestDailyCase) return <div>No Data</div>;

    const {
        latestDailyCase: {
            data: [dailyCase],
        },
    } = data;

    return (
        <Flex
            css={theme => css`
                height: 100%;
                width: 100%;
                position: absolute;
                flex-direction: column;
                ${theme.mq[1]} {
                }
            `}
        >
            <Menu />
            <div
                css={css`
                    position: relative;
                    width: 100%;
                    height: 100%;
                `}
            >
                <OpenMap data={dailyCase} />
                <Overview data={dailyCase} />
            </div>
        </Flex>
    );
}

export default MapDashboard;
