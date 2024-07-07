'use client';
import Image from "next/image";
import logoMobile from '/public/logo-mobile.svg';
import iconChevronDown from "/public/icon-chevron-down.svg";
import iconAddTaskMobile from '/public/icon-add-task-mobile.svg';
import {useData} from "@/context/DataContext";
import {useBoardStore} from "@/hooks/useStore";
import React from "react";
import clsx from "clsx";
import useSetUrl from "@/hooks/useSetUrl";
import EditDeleteMenu, {EditDeleteMenuSize} from "@/components/EditDeleteMenu";

interface Props {
    isMenuOpen: boolean,
    switchIsMenuOpen: React.Dispatch<React.SetStateAction<void>>;
    addRef: (el: HTMLElement) => void;
}

export default function NavBar(props: Props) {
    const {data} = useData();
    const board = useBoardStore((state) => state.board);
    const columnNames = useBoardStore((state) => state.columnNames);

    const {setAddMainTaskUrl, setDeleteBoardUrl, setEditBoardUrl} = useSetUrl();

    async function callApiDidi() {
        const response = await fetch("https://api.kaban.ntoniolo.wtf/discord-login", {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        console.log(await response.text());
    }

    let avatar = null;
    if (data.discordAvatarUrl != undefined) {
        avatar = (
            <a href={`/api/logout`}>
                <img
                    className="h-8 w-8 rounded-full"
                    src={data.discordAvatarUrl}
                />
            </a>
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
                <li>
                    {avatar && avatar}
                    {!avatar &&
                        <a
                            href={process.env.NODE_ENV == "development" ? `http://localhost:5264/discord-login` : `https://api.kaban.ntoniolo.wtf/discord-login`}>
                            <svg className="svg-icon w-6 fill-k-purple stroke-[0.3] stroke-k-purple" viewBox="0 0 20 20">
                                <path
                                    d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
                            </svg>
                        </a>
                    }
                </li>
                <li>
                    <button
                        className="bg-k-purple px-4 h-8 flex items-center justify-center rounded-3xl disabled:opacity-25 hover:bg-kh-purple"
                        disabled={board.id == 0 || columnNames.length == 0}
                        onClick={setAddMainTaskUrl}
                    >
                        <Image
                            className="block"
                            height={12}
                            width={12}
                            src={iconAddTaskMobile} alt="add new task"
                        />
                    </button>
                </li>
                <li>
                    <EditDeleteMenu
                        className="right-0 top-full mt-4 drop-shadow"
                        menuSize={EditDeleteMenuSize.Small}
                        actionEdit={{name: "Edit Board", onClick: setEditBoardUrl}}
                        actionDelete={{name: "Delete Board", onClick: () => setDeleteBoardUrl(board.id)}}
                    />
                </li>
            </div>
        </menu>
    );
}
