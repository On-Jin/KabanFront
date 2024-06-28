import React, {useEffect, useRef} from 'react';


const useClickOutside = <T extends HTMLElement, >(set: React.Dispatch<React.SetStateAction<any>>, additionalPredicate?: () => boolean) => {
    const refs = useRef<T[]>([]);

    const handleClickOutside = (event: MouseEvent) => {
        if ((additionalPredicate == null || additionalPredicate()) && !refs.current.some(ref => ref && ref.contains(event.target as Node))) {
            set(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [additionalPredicate]);

    const addRef = (el: T | null) => {
        if (el && !refs.current.includes(el)) {
            refs.current.push(el);
        }
    };

    return {refs, addRef};
};

export default useClickOutside;
