import Image from "next/image";
import iconCheck from '/public/icon-check.svg';
import {ReactNode} from "react";

export default function KCheckbox({value, updateCheckbox, children}: {
    value: boolean,
    updateCheckbox: (isChecked: boolean) => void,
    children: ReactNode,
}) {

    return (<div
        className="py-3 flex items-center px-3 gap-x-3
                   bg-k-light-grey dark:bg-k-dark-grey
                   hover:bg-k-purple hover:bg-opacity-25 rounded-md">
        <input type="checkbox" id="checkbox"
               className="relative peer
                                                appearance-none w-4 h-4 rounded
                                                bg-white dark:bg-k-dark-grey border-k-medium-grey border-opacity-25 border-[1px]
                                                checked:bg-k-purple checked:border-0"
               checked={value}
               onChange={(e) => updateCheckbox(e.target.checked)}
        />
        <div
            className="absolute h-4 w-4
                                           justify-center items-center
                                           pointer-events-none  
                                           hidden peer-checked:flex"
        >
            <Image
                className="w-2.5 h-2.5"
                src={iconCheck}
                alt="check"
            />
        </div>
        <label htmlFor="checkbox"
               className={"body-m " + (value ? "line-through opacity-50" : "")}
        >
            {children}
        </label>
    </div>);
}