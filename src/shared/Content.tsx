import NavBar from "@/shared/NavBar";
import React, {useState} from "react";
import {useBoardStore} from "@/hooks/useStore";
import SwitchTheme from "@/components/SwitchTheme";
import clsx from "clsx";
import {ReactSVG} from 'react-svg'
import useClickOutside from "@/hooks/useClickOutside";
import {CSSTransition} from "react-transition-group";
import Link from "next/link";
import useSetUrl from "@/hooks/useSetUrl";

export default function Content({children}: { children: React.ReactNode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const boardInfos = useBoardStore((state) => state.boardIds);
    const board = useBoardStore((state) => state.board);
    const {addRef} = useClickOutside<HTMLElement>(setIsMenuOpen);
    const {setAddBoardUrl} = useSetUrl();

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar addRef={addRef}
                    switchIsMenuOpen={() => setIsMenuOpen(!isMenuOpen)}
                    isMenuOpen={isMenuOpen}/>
            <main className="relative flex flex-col items-center grow">
                <CSSTransition
                    in={isMenuOpen}
                    timeout={400}
                    classNames="fade"
                    unmountOnExit
                    appear

                >
                    <div
                        className="absolute top-0 left-0 bottom-0 right-0
                                    flex justify-center items-start
                                    bg-opacity-50 bg-k-black z-50
                                    text-k-medium-grey"
                    >
                        <div
                            ref={(el) => {
                                if (el) addRef(el);
                            }}
                            className="bg-white py-4 m-4 pr-6 rounded-lg max-w-[325px]"
                        >
                            <p className="heading-s pb-5 pl-6">ALL BOARDS ({boardInfos?.length})</p>
                            <menu className="heading-m [&>*]:pl-6">
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
                            <SwitchTheme className="ml-4 mt-4"/>
                        </div>
                    </div>
                </CSSTransition>
                {children}
            </main>

        </div>
    );
}
