import React from "react";
import {forwardRef} from 'react';
import {FieldError} from "react-hook-form";
import clsx from "clsx";

interface KStringputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    oneLine?: boolean;
    error?: FieldError | undefined
}

const kStringput = forwardRef<HTMLTextAreaElement, KStringputProps>(
    function KStringput(
        {
            className,
            oneLine = true,
            error,
            disabled,
            ...rest
        }, ref
    ) {
        oneLine = oneLine ?? true;

        return (
            <div className={`${className} relative body-l`}>
            <textarea
                rows={1}
                className={
                    clsx(" resize-none block" +
                        " h-full text-k-black dark:text-white bg-transparent" +
                        " px-4 py-2 rounded border-[1px] border-solid border-k-medium-grey w-full focus:outline-none" +
                        " border-opacity-25 invalid:bg-gray-400",
                        {
                            "border-opacity-100 border-k-red": error,
                            "overflow-hidden text-nowrap": oneLine,
                            "opacity-50": disabled
                        }
                    )
                }
                disabled={disabled}
                ref={ref}
                {...rest}
            />
                {
                    (error) &&
                    (<div className="absolute right-0 top-0 bottom-0 self-center pr-4 text-k-red">
                        Can’t be empty
                    </div>)
                }

            </div>
        );
    });
export default kStringput
