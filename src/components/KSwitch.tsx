import React from "react";

interface ButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
}


export const KSwitch: React.FC<ButtonProps> = ({...props}) => {
    return (
        <label className="inline-flex items-center cursor-pointer">
            <input {...props} type="checkbox" value="" className="peer sr-only"/>
            <div
                className="peer relative w-10 h-5 bg-k-purple rounded-full

                                peer-checked:after:translate-x-[1.375rem]
                                rtl:peer-checked:after:-translate-x-full

                                after:content-[''] after:absolute
                                after:top-[3px] after:start-[2px]
                                after:bg-white after:rounded-full
                                after:h-3.5 after:w-3.5
                                after:transition-all"
            />
        </label>
    );
}
