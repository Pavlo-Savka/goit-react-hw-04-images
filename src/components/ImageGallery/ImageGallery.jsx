import css from './ImageGallery.module.css';
import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import React, { useState, useEffect } from 'react';

function ImageGallery(props) {
    const [scrollPosition, setScrollPosition] = useState(0);

        useEffect(() => {
            window.addEventListener("scroll", handleScroll);
            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        }, []);

        useEffect(() => {
            if (scrollPosition !== 0) {
                window.scrollTo(0, scrollPosition);
            }
        }, [scrollPosition]);

        const handleScroll = () => {
            setScrollPosition(window.pageYOffset);
        };

        return (
            <ul className={css.imageGallery}>
                {props.pictures &&
                    props.pictures.map((i) => (
                        <ImageGalleryItem
                            key={i.id}
                            src={i.webformatURL}
                            href={i.largeImageURL}
                            alt={i.tags}
                            onOpen={props.onOpen}
                        />
                    ))}
            </ul>
        );
    };

    export default ImageGallery;

    ImageGallery.propTypes = {
        pictures: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
            })
        ).isRequired,
    }