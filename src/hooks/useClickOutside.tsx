import React, {useEffect, useRef} from 'react';


const useClickOutside = <T extends HTMLElement, >(set: React.Dispatch<React.SetStateAction<any>>) => {
    const ref = useRef<T>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            set(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return {ref};
};

export default useClickOutside;
