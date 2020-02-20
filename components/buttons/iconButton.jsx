/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../common/button';

function IconButton(props) {
    const { icon, text } = props;
    return (
        <Button>
            <FontAwesomeIcon
                icon={icon}
                css={css`
                    margin: auto;
                `}
            />
            <span>{text}</span>
        </Button>
    );
}

export default IconButton;
