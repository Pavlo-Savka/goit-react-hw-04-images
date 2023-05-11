import { useState } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';
import PropTypes from "prop-types";

function Searchbar(props) {
    const [request, setRequest] = useState('');

    const handleInputChange = event => {
        setRequest(event.currentTarget.value.toLowerCase());
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (request.trim() === "") {
            return toast.error("Type search query!");
        }
        props.onSubmit(request);
    };

    return (
        <header className={css.searchbar}>
            <form className={css.form} onSubmit={handleSubmit }>

                <button type="submit" className={css.button} >
                    <span className={css['button-label']}>Search</span>
                </button>

                <input
                    className={css.input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    name="request"
                    value={request}
                    onChange={handleInputChange}
                />
            </form>
        </header>
    )
}
export default Searchbar;

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};