/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import dynamic from 'next/dynamic';
import { useQuery } from 'urql';
import gql from 'graphql-tag';
import Sidebar from '../modules/menu';
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
                cases {
                    data {
                        region
                        confirmed
                        deaths
                        recovered
                    }
                }
            }
        }
    }
`;

function MapTemplate() {
    const [result] = useQuery({ query: DAILY_CASE_QUERY });
    const { data, fetching, error } = result;
    if (fetching) return <div>Fetching</div>;
    if (error) return <div>Error</div>;

    const {
        latestDailyCase: {
            data: [dailyCase],
        },
    } = data;

    return (
        <Flex css={{ height: '100%', width: '100%', position: 'absolute' }}>
            <Sidebar />
            <div
                css={css`
                    width: 100%;
                `}
            >
                <OpenMap />
                <Overview dailyCase={dailyCase} />
            </div>
        </Flex>
    );
}

export default MapTemplate;
