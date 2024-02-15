import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

Button.propTypes = {
    link: PropTypes.string,
    title: PropTypes.string,
};

function Button(props) {
    const { link, title, black } = props;
    return (
        <Link
            to={link}
            className={`action-btn ${black ? 'b' : ''}`}
        >
            <span>{title}</span>
        </Link>
    );
}

export default Button;
