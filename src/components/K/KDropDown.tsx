﻿'use client'
import Image from "next/image";
import iconChevronDown from "/public/icon-chevron-down.svg";
import iconChevronUp from "/public/icon-chevron-up.svg";
import React, {forwardRef, useEffect, useRef, useState} from "react";
import clsx from "clsx";
import {FieldError} from "react-hook-form";

interface KDropDownProps {
    className?: string,
    value: string,
    options: string[],
    disabled?: boolean,
    error?: FieldError | undefined
    onChange: (newValue: string) => void
}

const KDropDown = forwardRef<HTMLSelectElement, KDropDownProps>(
    function KDropDown({className, value, options, onChange, error, disabled}) {
        const [isOpen, setIsOpen] = useState(false);
        const dropdownRef = useRef<HTMLDivElement>(null);
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        useEffect(() => {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, []);

        const optionsRendered = options.map(o => {
            return (
                <div
                    key={o}
                    className={"cursor-pointer p-2 px-4 bg-k-transparent hover:bg-k-medium-grey hover:bg-opacity-5 "}
                    onClick={() => {
                        onChange(o);
                        setIsOpen(false)
                    }}
                >
                    {o}
                </div>
            );
        });
        return (
            <div
                ref={dropdownRef}
                className={
                    clsx(`relative body-l ${className}`,
                        {"": error},
                        {"pointer-events-none opacity-50": disabled}
                    )
                }
            >
                <div
                    className={"cursor-pointer select-none px-4 py-2 rounded border-[1px] border-solid border-k-medium-grey w-full text-k-black dark:text-white focus:outline-none appearance-none" +
                        (isOpen ? " border-k-purple" : " hover:bg-k-medium-grey hover:bg-opacity-5 border-opacity-25")}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {value}
                </div>
                <div
                    className="absolute right-0 top-0 bottom-0 h-full self-center flex p-4
                                           justify-center items-center
                                           pointer-events-none"
                >
                    <Image
                        className="text-k-purple w-3 h-auto"
                        src={iconChevronDown}
                        alt=""
                    />
                </div>

                {isOpen &&
                    (
                        <div className="absolute left-0 right-0 z-10 py-2
                              bg-white dark:bg-k-dark-grey
                              text-k-medium-grey">
                            {optionsRendered}
                        </div>
                    )
                }

            </div>
        );
    });
export default KDropDown
