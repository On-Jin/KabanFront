// 'use client';
import Image from "next/image";
import logoMobile from '/public/logo-mobile.svg';
import iconChevronDown from "/public/icon-chevron-down.svg";
import iconVerticalEllipsis from '/public/icon-vertical-ellipsis.svg';
import iconAddTaskMobile from '/public/icon-add-task-mobile.svg';
import {useData} from "@/context/DataContext";
import {useBoardStore} from "@/hooks/useStore";
import React from "react";
import clsx from "clsx";
import useSetUrl from "@/hooks/useSetUrl";

interface Props {
    isMenuOpen: boolean,
    switchIsMenuOpen: React.Dispatch<React.SetStateAction<void>>;
    addRef: (el: HTMLElement) => void;
}

export default function NavBar(props: Props) {
    const {data} = useData();
    const board = useBoardStore((state) => state.board);

    const {setAddMainTaskUrl, setEditBoardUrl} = useSetUrl();

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
                        ref={(el) => {
                            if (el) props.addRef(el);
                        }}
                        className={clsx("heading-l flex flex-row space-x-2", {
                            // "pointer-events-none cursor-pointer": props.isMenuOpen
                        })}
                        onClick={() => {
                            props.switchIsMenuOpen();
                        }}
                        onMouseUp={() => {
                        }}
                        onMouseDown={() => {
                        }}
                    >
                        <h2 className="block">
                            {board.id == 0 ? "Kaban" : board.name}
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
                    <button
                        className="bg-k-purple px-4 h-8 flex items-center justify-center rounded-3xl disabled:opacity-25 hover:bg-kh-purple"
                        disabled={board.id == 0}
                        onClick={setAddMainTaskUrl}
                    >
                        <Image
                            className="block"
                            height={12}
                            width={12}
                            src={iconAddTaskMobile} alt="add new task"
                        />
                        {/*<span>Add New Task</span>*/}
                    </button>
                </li>
                <li className="h-4 appearance-none">
                    <button
                        className="flex"
                        disabled={board.id == 0}
                        onClick={setEditBoardUrl}
                    >
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
