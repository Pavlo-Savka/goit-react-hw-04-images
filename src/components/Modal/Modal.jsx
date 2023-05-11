import css from './Modal.module.css';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

function Modal(props) {
    
    const handleKeyDown = (e) => {
        if (e.code === "Escape") {
            props.onClose();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return createPortal(
        <div className={css.overlay}>
            <div className={css.modal}>
                <button type="button" onClick={props.onClose}>Close X</button>
                <img src={props.selectedImage} alt="" />
            </div>
        </div>,
        modalRoot
    );
}

export default Modal;