/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import Logo from '../buttons/logo';
import IconButton from '../buttons/iconButton';
import Flex from '../common/flex';
import { faChartLine, faMapMarked } from '@fortawesome/free-solid-svg-icons';

function Menu() {
    return (
        <>
            <Logo />
            <Flex
                css={theme => css`
                    width: 72px;
                    height: 100%;
                    background: ${theme.colors.bgColor1};
                    justify-content: center;
                    flex-direction: column;
                    box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 3px 0px;
                    z-index: 1000;
                    height: 72px;
                    width: 100%;
                    flex-direction: row;
                    // ${theme.mq[1]} {
                    //     order: 1;
                    // }
                `}
            >
                <IconButton icon={faMapMarked} text={'지도'} />
                <IconButton icon={faChartLine} text={'지표'} />
            </Flex>
        </>
    );
}

export default Menu;
