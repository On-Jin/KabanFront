import {useEffect} from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css'; // Create a CSS module for modal styling

const Modal = ({isOpen, onClose, children}:
                   {
                       isOpen: boolean,
                       onClose: () => void,
                       children: React.ReactNode;
                   }
) => {

    // Use effect to handle closing the modal on escape key press
    useEffect(() => {
        const handleEsc = (event: any) => {
            if (event.keyCode === 27) onClose();
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed left-0 right-0 bottom-0 top-0 w-full h-full
                        bg-opacity-50 bg-k-black
                        z-40
                        flex items-center" onMouseDown={(e) => e.stopPropagation()} onClick={(e) => {
            e.stopPropagation();
            onClose()
        }}>
            <div className="bg-white w-full h-fit m-4 p-6 rounded-lg " onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;