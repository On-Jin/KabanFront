import NavBar from "@/shared/NavBar";
import React, {useState} from "react";
import {useBoardStore} from "@/hooks/useStore";
import SwitchTheme from "@/components/SwitchTheme";
import clsx from "clsx";
import {ReactSVG} from 'react-svg'
import useClickOutside from "@/hooks/useClickOutside";
import {CSSTransition} from "react-transition-group";

export default function Content({children}: { children: React.ReactNode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const boardInfos = useBoardStore((state) => state.boardIds);
    const {ref} = useClickOutside<HTMLDivElement>(setIsMenuOpen);

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar switchIsMenuOpen={() => setIsMenuOpen(!isMenuOpen)}/>
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
                            ref={ref}
                            className="bg-white py-4 m-4 pr-6 rounded-lg max-w-[325px]"
                        >
                            <p className="heading-s pb-5 pl-6">ALL BOARDS ({boardInfos?.length})</p>
                            <menu className="heading-m [&>*]:pl-6">
                                {boardInfos?.map((b, i) => (
                                    <li key={b.id}
                                        className={clsx("flex items-center gap-x-3 py-3.5 pr-14 rounded-r-full", {
                                            "bg-k-purple text-white": i == 0
                                        })}
                                    >
                                        <ReactSVG className={clsx("w-4 h-4 fill-[#828FA3]", {
                                            "fill-white": i == 0
                                        })} src="/icon-board.svg"/>
                                        <span>{b.name}</span>
                                    </li>
                                ))}
                                <li
                                    className={clsx("flex items-center gap-x-3 py-3.5 pr-14 rounded-r-full")}
                                >
                                    <ReactSVG className={clsx("w-4 h-4 fill-k-purple")} src="/icon-board.svg"/>
                                    <span className="text-k-purple">+ Create New Board</span>
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
