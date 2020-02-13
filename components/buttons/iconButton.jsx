/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../common/button';

function Chart(props) {
    const { icon, text } = props;
    return (
        <Button>
            <FontAwesomeIcon icon={icon} style={{ margin: '0 auto' }} />
            <span>{text}</span>
        </Button>
    );
}

export default Chart;
