import css from './ImageGalleryItem.module.css';
import PropTypes from "prop-types";
const { Component } = require("react");

class ImageGalleryItem extends Component {
       
    render() {
        return (
            <li onClick={() => this.props.onOpen(this.props.href)}  className={css.imageGalleryItem}>
                <img src={this.props.src} onClick={this.props.onClick} alt={this.props.alt} className={css['imageGalleryItem-image']} />
            </li>  
    )
}
}
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    onOpen: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
};