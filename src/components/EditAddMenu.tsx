import React, {useState} from "react";
import clsx from "clsx";
import {ReactSVG} from "react-svg";
import useClickOutside from "@/hooks/useClickOutside";

export default function EditAddMenu({disabled, onClickEdit, onClickDelete}: {
    disabled: boolean,
    onClickEdit: () => void,
    onClickDelete: () => void,
}) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const {addRef} = useClickOutside<HTMLElement>(setIsMenuOpen);

    return (
        <>
            <div className="relative flex">
                <button
                    type="button"
                    ref={(el) => addRef(el)}
                    className="px-4 z-10"
                    disabled={disabled}
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsMenuOpen(!isMenuOpen);
                    }}
                >
                    <ReactSVG className={clsx("")} src="/icon-vertical-ellipsis.svg"/>
                </button>

                {isMenuOpen && (
                    <div
                        ref={(el) => addRef(el)}
                        className="absolute left-1/2 transform -translate-x-1/2 top-[100%]
                                            rounded-lg p-4 space-y-4 w-[190px] bg-white body-l">
                        <button
                            disabled={disabled}
                            className="text-k-medium-grey hover:enabled:font-bold w-full flex justify-center"
                            onClick={() => onClickEdit()}
                        >
                            Edit Task
                        </button>

                        <button
                            disabled={disabled}
                            className="text-k-red hover:enabled:font-bold w-full flex justify-center"
                            onClick={(e) => {
                                e.stopPropagation();
                                onClickDelete();
                            }}>
                            Delete Task
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
