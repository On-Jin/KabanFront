import {useEffect} from 'react';

const usePointerEvents = (isDisabled: boolean) => {
    useEffect(() => {
        if (isDisabled) {
            document.body.style.pointerEvents = 'none';
        } else {
            document.body.style.pointerEvents = 'auto';
        }

        return () => {
            document.body.style.pointerEvents = 'auto';
        };
    }, [isDisabled]);
};

export default usePointerEvents;
