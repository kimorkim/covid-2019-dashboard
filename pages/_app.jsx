import { Global, css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { withUrqlClient } from 'next-urql';
const theme = {
    colors: {
        primary: 'hotpink',
        fontColor1: '#ff416c',
        fontColor2: 'black',
        fontColor3: 'green',
        fontColor4: 'red',
        bgColor1: 'white',
        bgColor2: '#f3f3f3',
        bgColor3: '#f3f3f399',
    },
    fonts: {
        aria: '"Roboto", "Helvetica Neue", Arial, sans-serif',
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
                            font-family: ${theme.fonts.aria};
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
