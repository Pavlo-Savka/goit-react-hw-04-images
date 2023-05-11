import css from './Button.module.css';
import PropTypes from "prop-types";
import React from 'react';

function Button(props) {
    return (
        <button onClick={props.onLoadMore} className={css.button}>
            Load more
        </button>
    );
}

Button.propTypes = {
    onLoadMore: PropTypes.func.isRequired,
};

export default Button;