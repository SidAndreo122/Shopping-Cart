import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { SquareX } from 'lucide-react';

function Modal({isOpen, OnClose, children}) {
    const ref = useRef(); // use dialog DOM element as a reference 

    useEffect(() => {
        if (isOpen) {
            ref.current?.showModal(); // able to use showModal() now due to ref
        } else {
            ref.current?.close(); // able to use close now due to ref
        }
    }, [isOpen]); // renders everytime 'isOpen' changes
    

    return (
        <dialog ref={ref} onCancel={OnClose}>
            {children}
            {/* Add divs for css?*/}
            <button onClick={OnClose}>
                <SquareX size={29} />
            </button>
        </dialog>
    );
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    OnClose: PropTypes.func.isRequired,
    children: PropTypes.node,
}

export default Modal;