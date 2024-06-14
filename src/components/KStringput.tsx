import {useEffect, useRef, useState} from "react";
import {FieldValue, FieldValues, UseFormRegister} from "react-hook-form";

export default function KStringput<TInput extends FieldValues>({
                                       className,
                                       register,
                                       inputText,
                                       onChangeInput,
                                       exampleValue,
                                       canBeEmpty = false,
                                       oneLine = true
                                   }: {
    className?: string,
    register?:  UseFormRegister<TInput>
    inputText: string,
    onChangeInput?: (value: string) => void,
    exampleValue?: string,
    canBeEmpty?: boolean,
    oneLine?: boolean
}) {
    oneLine = oneLine ?? true;
    canBeEmpty = canBeEmpty ?? false;
    const [isFirstTimeEmpty, setIsFirstTimeEmpty] = useState(inputText == '')
    const isFirstRender = useRef(true);
    const isEmpty = !canBeEmpty && (inputText == undefined || inputText.length === 0) && !isFirstTimeEmpty;

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
                value={inputText}
                onChange={(e) => onChangeInput?.(e.target.value)}
                name="stringput"
                placeholder={exampleValue ? exampleValue : "Enter task name"}
            />
            {
                (isEmpty) &&
                (<div className="absolute right-0 top-0 bottom-0 self-center pr-4 text-k-red">
                    Can’t be empty
                </div>)
            }

        </div>
    );
}
