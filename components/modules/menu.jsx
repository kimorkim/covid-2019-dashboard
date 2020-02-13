import Logo from '../buttons/logo';
import IconButton from '../buttons/iconButton';
import Flex from '../common/flex';
import { useTheme } from 'emotion-theming';
import { faChartLine, faMapMarked } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
    const theme = useTheme();
    return (
        <Flex
            css={{
                width: '72px',
                height: '100%',
                background: theme.colors.bgColor1,
                justifyContent: 'center',
                flexDirection: 'column',
                boxShadow: 'rgba(0, 0, 0, 0.25) 0px 1px 3px 0px',
            }}
        >
            <Logo />
            <IconButton icon={faMapMarked} text={'지도'} />
            <IconButton icon={faChartLine} text={'지표'} />
        </Flex>
    );
}

export default Sidebar;
