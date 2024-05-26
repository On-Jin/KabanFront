// 'use client';
import KDropDown from "@/components/KDropDown";

import Image from "next/image";
import logoMobile from '/public/logo-mobile.svg';
import iconChevronDown from "/public/icon-chevron-down.svg";
import iconVerticalEllipsis from '/public/icon-vertical-ellipsis.svg';
import iconAddTaskMobile from '/public/icon-add-task-mobile.svg';
import {useData} from "@/context/DataContext";

export default function NavBar() {
    const {data} = useData();
    let avartar = <></>;
    if (data.discordAvatarUrl != undefined) {
        avartar = (
            <img
                className="h-6 w-6 rounded-full"
                src={data.discordAvatarUrl}
            />
        )
    }

    return (
        <menu className="flex justify-between px-4 py-4
                        bg-white text-k-dark-grey dark:bg-k-dark-grey dark:text-white">
            <div className="flex space-x-4">
                <li className="my-auto">
                    <Image
                        height={25}
                        src={logoMobile} alt="logo"
                    />
                </li>
                <li className="my-auto">
                    <button
                        className="heading-l flex flex-row space-x-2"
                    >
                        <h2 className="block">
                            Platform Launch
                        </h2>
                        <Image
                            className="block self-center"
                            height={8}
                            src={iconChevronDown} alt="icon opening board menu"
                        />
                    </button>
                </li>
            </div>
            <div className="flex space-x-4 justify-items-center items-center ">
                <li>{avartar}</li>
                <li>
                    <button className="bg-k-purple w-12 h-8 flex items-center justify-center rounded-3xl opacity-25">
                        <Image
                            className="block"
                            height={12}
                            width={12}
                            src={iconAddTaskMobile} alt="add new board"
                        />
                    </button>
                </li>
                <li className="h-4 appearance-none">
                    <button className="flex">
                        <Image
                            className="block "
                            height={16}
                            src={iconVerticalEllipsis} alt="options"
                        />
                    </button>
                </li>
            </div>
        </menu>
    );
}