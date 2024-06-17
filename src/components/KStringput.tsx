import React, {useEffect, useRef, useState} from "react";
import {forwardRef} from 'react';
import {FieldError} from "react-hook-form";

interface KStringputProps {
    className?: string;
    inputText?: string;
    onChangeInput?: (value: string) => void;
    placeholder?: string;
    canBeEmpty?: boolean;
    oneLine?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    name?: string;
    label?: string;
    value?: string;
    disabled?: boolean;
    isError?: FieldError | undefined
}

let kStringput = forwardRef<HTMLTextAreaElement, KStringputProps>(
    function KStringput(
        {
            className,
            inputText,
            onChangeInput,
            placeholder,
            canBeEmpty = false,
            oneLine = true,
            onChange,
            onBlur,
            name,
            isError,
            disabled,
            value
        }, ref
    ) {
        oneLine = oneLine ?? true;
        canBeEmpty = canBeEmpty ?? false;
        const [isFirstTimeEmpty, setIsFirstTimeEmpty] = useState(inputText == '')
        const isFirstRender = useRef(true);
        // const isEmpty = isError || (!canBeEmpty && (inputText == undefined || inputText.length === 0) && !isFirstTimeEmpty);

        const isEmpty = isError;

        useEffect(() => {
            if (isFirstRender.current) {
                isFirstRender.current = false;
            } else {
                if (isFirstTimeEmpty && inputText == '') {
                    setIsFirstTimeEmpty(false);
                }
            }
        }, [inputText]);

        return (
            <div className={`${className} relative body-l`}>
            <textarea
                rows={1}
                className={
                    "resize-none block" +
                    " h-full text-k-black dark:text-white bg-transparent" +
                    " px-4 py-2 rounded border-[1px] border-solid border-k-medium-grey w-full focus:outline-none"
                    + (isEmpty ? " border-opacity-100 border-k-red" : " border-opacity-25")
                    + (oneLine ? " overflow-hidden text-nowrap" : " ")
                }
                // value={inputText}
                value={value}
                onChange={(e) => {
                    onChangeInput?.(e.target.value);
                    onChange?.(e);
                }}
                onBlur={onBlur}
                name={name}
                disabled={disabled}
                placeholder={placeholder}
                ref={ref}
            />
                {
                    (isEmpty) &&
                    (<div className="absolute right-0 top-0 bottom-0 self-center pr-4 text-k-red">
                        Can’t be empty
                    </div>)
                }

            </div>
        );
    });
export default kStringput
