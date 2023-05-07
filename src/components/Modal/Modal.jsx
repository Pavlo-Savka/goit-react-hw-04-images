import css from './Modal.module.css';
import { createPortal } from 'react-dom';
const { Component } = require("react");
const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {

    componentDidMount() {
        this.handleKeyDown = (e) => {
            if (e.code === "Escape") {
                this.props.onClose();
            }
        };
        window.addEventListener('keydown', this.handleKeyDown);
    };
    componentWillUnmount() {
        this.removeListener();
    }

    removeListener() {
        window.removeEventListener('keydown', this.handleKeyDown);
    } 
    
    render() {
        return createPortal(
            <div className={css.overlay}>
                <div className={css.modal}>
                    <button type="button" onClick={this.props.onClose}>Close X</button>
                    <img src={this.props.selectedImage} alt="" />
                </div>
            </div>, modalRoot
        )
    }
}
export default Modal;