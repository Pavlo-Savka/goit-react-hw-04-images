import { toast } from 'react-toastify';
import css from './Searchbar.module.css';
import PropTypes from "prop-types";

const { Component } = require("react");

class Searchbar extends Component {
    state = {
        request: '',
    };

    handleInputChange = event => {
        this.setState({ [event.currentTarget.name]: event.currentTarget.value.toLowerCase() });
    };

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.request.trim() === "") {
            return  toast.error("Type search query!");
        }
        this.props.onSubmit(this.state.request);
    }

    render() {
        return (
            <header className={css.searchbar}>
                <form className={css.form} onSubmit={this.handleSubmit}>
                    <button type="submit" className={css.button}>
                        <span className={css['button-label']}>Search</span>
                    </button>

                    <input
                        className={css.input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        name="request"
                        onChange={this.handleInputChange}
                    />
                </form>
            </header>
        )
    }
}
export default Searchbar;

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};