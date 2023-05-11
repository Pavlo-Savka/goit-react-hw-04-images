import css from './ImageGalleryItem.module.css';
import PropTypes from "prop-types";
import React from 'react';

function ImageGalleryItem(props) {
    const handleClick = () => {
        props.onOpen(props.href);
    };

    return (
        <li onClick={handleClick} className={css.imageGalleryItem}>
            <img src={props.src} alt={props.alt} className={css['imageGalleryItem-image']} />
        </li>
    );
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    onOpen: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
};