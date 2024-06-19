import {forwardRef, useEffect, useState} from 'react';


interface ModalProps {
    onClose: () => void,
    children: React.ReactNode;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(function ({onClose, children}, ref) {
    const [mouseIsDownOnModal, setMouseIsDownOnModal] = useState(false);

    useEffect(() => {
        const handleEsc = (event: any) => {
            if (event.keyCode === 27) onClose();
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    return (
        <div
            ref={ref}
            className="fixed left-0 right-0 bottom-0 top-0 w-full h-full
                        bg-opacity-50 bg-k-black
                        z-40
                        flex items-center justify-center"
            onMouseUp={(e) => {
                e.stopPropagation();
                if (!mouseIsDownOnModal) {
                    onClose();
                } else {
                    setMouseIsDownOnModal(false);
                }
            }}
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <div
                className="bg-white w-full h-fit m-4 p-6 rounded-lg md:w-[480px]"
                onClick={(e) => e.stopPropagation()}
                onMouseUp={(e) => {
                    e.stopPropagation();
                    if (mouseIsDownOnModal)
                        setMouseIsDownOnModal(false)
                }}
                onMouseDown={(e) => {
                    setMouseIsDownOnModal(true)
                }}
            >
                {children}
            </div>
        </div>
    );
});

Modal.displayName = 'Modal';
export default Modal;
