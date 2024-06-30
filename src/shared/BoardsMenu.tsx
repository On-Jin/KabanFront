import React, {useState} from "react";
import {useBoardStore} from "@/hooks/useStore";
import SwitchTheme from "@/components/SwitchTheme";
import clsx from "clsx";
import {ReactSVG} from 'react-svg'
import Link from "next/link";
import useSetUrl from "@/hooks/useSetUrl";

export default function BoardsMenu() {
    const boardInfos = useBoardStore((state) => state.boardIds);
    const board = useBoardStore((state) => state.board);
    const setIsMenuOpen = useBoardStore((state) => state.setIsMenuOpen);
    const {setAddBoardUrl} = useSetUrl();

    return (
        <div className="flex flex-col justify-between h-full text-k-medium-grey md:max-w-full md:w-full pr-6
                        border-kl-lines dark:border-kd-lines md:border-r"
        >
            <div className="">
                <p className="heading-s pb-5 pl-6 lg:pl-8">ALL BOARDS ({boardInfos?.length})</p>
                <menu className="heading-m [&>*]:pl-6 lg:[&>*]:pl-8">
                    {boardInfos?.map(b => (
                        <li key={b.id}
                            className={clsx("py-3.5 rounded-r-full", {
                                "bg-k-purple text-white": b.id === board.id
                            })}
                        >
                            <Link href={`/board/${b.id}`}>
                                <div className="flex items-center gap-x-3">
                                    <ReactSVG className={clsx("w-4 h-4 fill-[#828FA3]", {
                                        "fill-white": b.id === board.id
                                    })} src="/icon-board.svg"/>
                                    <span>{b.name}</span>
                                </div>
                            </Link>
                        </li>
                    ))}
                    <li
                        className={clsx("flex items-center gap-x-3 py-3.5 rounded-r-full")}
                    >
                        <ReactSVG className={clsx("w-4 h-4 fill-k-purple")} src="/icon-board.svg"/>
                        <button
                            className="text-k-purple"
                            onClick={() => {
                                setIsMenuOpen(false);
                                setAddBoardUrl();
                            }}
                        >
                            + Create New Board
                        </button>
                    </li>
                </menu>
            </div>
            <div className="ml-6 mt-4 md:m-0 space-y-4 md:pb-12">
                <SwitchTheme className="md:ml-6"/>
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="hidden md:flex w-full pl-6 py-3.5 gap-x-2 items-center heading-m rounded-r-full
                                hover:dark:bg-white hover:bg-k-purple hover:bg-opacity-10
                                hover:text-k-purple
                                group
                                "
                >
                    <ReactSVG className="fill-[#828FA3] group-hover:fill-k-purple" src="/icon-hide-sidebar.svg"/>
                    Hide Sidebar
                </button>
            </div>
        </div>
    );
}
