import css from './Button.module.css';
import PropTypes from "prop-types";
const { Component } = require("react");

class Button extends Component {

    render() {
        return (
            <button onClick={this.props.onLoadMore} className={css.button}>
                Load more
            </button>
        )
    }


}
export default Button;

Button.propTypes = {
    onLoadMore: PropTypes.func.isRequired,
};