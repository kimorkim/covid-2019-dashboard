import Document, { Html, Head, Main, NextScript } from 'next/document';

const setGoogleTags = () => {
    return {
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-158839135-1');
        `,
    };
};

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <script
                        async
                        src="https://www.googletagmanager.com/gtag/js?id=UA-158839135-1"
                    ></script>
                    <script dangerouslySetInnerHTML={setGoogleTags()} />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
