import { useEffect } from 'react';
import Router from 'next/router';

function HomePage() {
    useEffect(() => {
        Router.push('/map');
    });
    return <div />;
}

export default HomePage;
