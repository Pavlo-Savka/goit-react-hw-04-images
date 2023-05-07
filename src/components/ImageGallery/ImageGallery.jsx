import css from './ImageGallery.module.css';
import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
const { Component } = require("react");

class ImageGallrey extends Component {
    state = {
        scrollPosition: 0
    };

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        this.setState({
            scrollPosition: window.pageYOffset
        });
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.scrollPosition !== this.state.scrollPosition) {
            window.scrollTo(0, this.state.scrollPosition);
        }
    }

    render() {
                return (
                        <ul className={css.imageGallery}>
                        {this.props.pictures &&
                            this.props.pictures.map((i) => (
                                <ImageGalleryItem
                                    key={i.id}
                                    src={i.webformatURL}
                                    href={i.largeImageURL}
                                    alt={i.tags}
                                    onOpen={this.props.onOpen}
                                />
                            ))}
                        </ul>
                );
            }   
        }

export default ImageGallrey;

ImageGallrey.propTypes = {

    pictures: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
        })
    ).isRequired,
};