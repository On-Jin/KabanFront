import React, {useState} from "react";
import clsx from "clsx";
import {ReactSVG} from "react-svg";
import useClickOutside from "@/hooks/useClickOutside";

export enum EditDeleteMenuSize {
    Small,
    Big
}

export interface NameActionProp {
    name: string;
    onClick: () => void
}

export default function EditDeleteMenu({className, actionEdit, actionDelete, menuSize}: {
    className?: string | null,
    actionEdit: NameActionProp,
    actionDelete: NameActionProp,
    menuSize?: EditDeleteMenuSize | null
}) {

    menuSize = menuSize ?? EditDeleteMenuSize.Small;
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const {addRef} = useClickOutside<HTMLElement>(setIsMenuOpen);

    return (
        <>
            <div className="relative flex z-20">
                <button
                    type="button"
                    ref={(el) => addRef(el)}
                    className="px-1 z-10"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsMenuOpen(!isMenuOpen);
                    }}
                >
                    <ReactSVG className={clsx("scale-[80%]", {
                        "scale-[100%]": menuSize === EditDeleteMenuSize.Big,
                    })} src="/icon-vertical-ellipsis.svg"/>
                </button>

                {isMenuOpen && (
                    <div
                        ref={(el) => addRef(el)}
                        className={clsx(`bg-white dark:bg-k-dark-grey
                                        absolute rounded-lg p-4 space-y-4 w-[190px] body-l ${className}`,
                            {
                                "left-1/2 transform -translate-x-1/2 top-[100%]": !className
                            }
                        )}
                    >
                        <button
                            className="text-k-medium-grey hover:enabled:font-bold w-full flex justify-center"
                            onClick={() => actionEdit.onClick()}
                        >
                            {actionEdit.name}
                        </button>

                        <button
                            className="text-k-red hover:enabled:font-bold w-full flex justify-center"
                            onClick={(e) => {
                                e.stopPropagation();
                                actionDelete.onClick();
                            }}>
                            {actionDelete.name}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
