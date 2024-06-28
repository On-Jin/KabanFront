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
import {useBreakpoint} from "@/hooks/useBreakpoint";
import NavBarDesktop from "@/shared/NavBarDesktop";
import BoardsMenu from "@/shared/BoardsMenu";

export default function Content({children}: { children: React.ReactNode }) {
    const boardInfos = useBoardStore((state) => state.boardIds);
    const board = useBoardStore((state) => state.board);
    const isMenuOpen = useBoardStore((state) => state.isMenuOpen);
    const setIsMenuOpen = useBoardStore((state) => state.setIsMenuOpen);
    const {setAddBoardUrl} = useSetUrl();
    const isDesktop = useBreakpoint("md");
    const {addRef} = useClickOutside<HTMLElement>(setIsMenuOpen, () => !isDesktop);

    return (
        <div className="flex flex-col min-h-screen max-h-screen">
            {!isDesktop && <NavBar
                addRef={addRef}
                switchIsMenuOpen={() => setIsMenuOpen(!isMenuOpen)}
                isMenuOpen={isMenuOpen}/>}

            {isDesktop && <NavBarDesktop
                switchIsMenuOpen={() => setIsMenuOpen(!isMenuOpen)}
                isMenuOpen={isMenuOpen}/>}

            <main className={clsx("relative flex-grow flex overflow-hidden")}>
                {/*<CSSTransition*/}
                {/*    in={isMenuOpen}*/}
                {/*    timeout={400}*/}
                {/*    classNames="left-menu"*/}
                {/*    unmountOnExit*/}
                {/*    appear*/}

                {/*>*/}
                {/*<div className={clsx("hidden lg:block bg-k-red overflow-hidden transition-all", {*/}
                {/*    // "-translate-x-full": !isMenuOpen,*/}
                {/*    // "translate-x-0": isMenuOpen,*/}
                {/*    "w-0": !isMenuOpen,*/}
                {/*    "w-[200px]": isMenuOpen,*/}
                {/*})}>*/}
                {/*    awedee*/}
                {/*</div>*/}
                {/*</CSSTransition>*/}
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
                                    md:invisible"
                    >
                        <div
                            ref={(el) => {
                                if (el) addRef(el);
                            }}
                            className="bg-white py-4 m-4 pr-6 rounded-lg max-w-[325px]"
                        >
                            <BoardsMenu/>
                        </div>
                    </div>
                </CSSTransition>
                <menu className={clsx("hidden md:block bg-white overflow-hidden transition-all shrink-0", {
                    "w-0": !isMenuOpen,
                    "md:w-[260px] lg:w-[300px]": isMenuOpen,
                })}>
                    <BoardsMenu/>
                </menu>
                <div className="overflow-auto flex-grow">
                    {children}
                </div>
            </main>

        </div>
    );
}
