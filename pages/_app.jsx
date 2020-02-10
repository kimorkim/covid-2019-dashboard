import { Global, css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { withUrqlClient } from 'next-urql';
const theme = {
    colors: {
        primary: 'hotpink',
        bgColor1: 'white',
        bgColor2: '#f3f3f3',
    },
};

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme}>
            <Global
                styles={css`
                    @media (prefers-color-scheme: dark) {
                        html {
                            filter: invert(1);
                        }
                    }
                    html,
                    body {
                        margin: 0;
                        background: #f3f3f3;
                    }
                `}
            />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default withUrqlClient({
    url: process.env.faunaDbGraphQlEndpoint,
    fetchOptions: {
        headers: {
            Authorization: `Bearer ${process.env.faunaDbSecret}`,
            'Content-type': 'application/json',
            Accept: 'application/json',
        },
    },
})(MyApp);
