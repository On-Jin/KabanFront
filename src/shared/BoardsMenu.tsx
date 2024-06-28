import React, {useState} from "react";
import {useBoardStore} from "@/hooks/useStore";
import SwitchTheme from "@/components/SwitchTheme";
import clsx from "clsx";
import {ReactSVG} from 'react-svg'
import Link from "next/link";
import useSetUrl from "@/hooks/useSetUrl";
import {useBreakpoint} from "@/hooks/useBreakpoint";

export default function BoardsMenu() {
    const boardInfos = useBoardStore((state) => state.boardIds);
    const board = useBoardStore((state) => state.board);
    const setIsMenuOpen = useBoardStore((state) => state.setIsMenuOpen);
    const {setAddBoardUrl} = useSetUrl();
    const isDesktop = useBreakpoint("md");

    return (
        <div className="flex flex-col justify-between h-full text-k-medium-grey">
            <div className="">
                <p className="heading-s pb-5 pl-6 lg:pl-8">ALL BOARDS ({boardInfos?.length})</p>
                <menu className="heading-m [&>*]:pl-6 lg:[&>*]:pl-8">
                    {boardInfos?.map(b => (
                        <li key={b.id}
                            className={clsx("py-3.5 pr-14 rounded-r-full", {
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
                        className={clsx("flex items-center gap-x-3 py-3.5 pr-14 rounded-r-full")}
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
            <div className="ml-4 mt-4 md:m-0 md:mx-6 space-y-4 md:pb-12">
                <SwitchTheme className=""/>
                <button className="hidden md:flex gap-x-2 items-center heading-m"><ReactSVG src="/icon-hide-sidebar.svg"/> Hide Sidebar</button>
            </div>
        </div>
    );
}
