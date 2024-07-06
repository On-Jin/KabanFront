'use client';
import Image from "next/image";
import iconAddTaskMobile from '/public/icon-add-task-mobile.svg';
import {useData} from "@/context/DataContext";
import {useBoardStore} from "@/hooks/useStore";
import React from "react";
import useSetUrl from "@/hooks/useSetUrl";
import EditDeleteMenu, {EditDeleteMenuSize} from "@/components/EditDeleteMenu";
import Link from "next/link";
import {ReactSVG} from "react-svg";
import {useTheme} from "@/hooks/useTheme";
import {Theme} from "@/lib/Theme";

interface Props {
    isMenuOpen: boolean,
    switchIsMenuOpen: React.Dispatch<React.SetStateAction<void>>;
}

export default function NavBarDesktop(props: Props) {
    const {data} = useData();
    const board = useBoardStore((state) => state.board);
    const columnNames = useBoardStore((state) => state.columnNames);

    const {setAddMainTaskUrl, setDeleteBoardUrl, setEditBoardUrl} = useSetUrl();

    let avatar = null;
    if (data.discordAvatarUrl != undefined) {
        avatar = (
            <a href={`/api/logout`}>
                <img
                    className="h-6 w-6 rounded-full"
                    src={data.discordAvatarUrl}
                />
            </a>
        )
    }

    return (
        <menu className="flex items-center
                        bg-white dark:bg-k-dark-grey text-k-dark-grey dark:text-white
                        border-b border-kl-lines dark:border-kd-lines
                        ">
            <div className="">
                <li className="my-auto md:w-[259px] lg:w-[299px] " onClick={() => {
                    props.switchIsMenuOpen();
                }}>
                    <h1 className="heading-l space-x-2 flex justify-center">
                        <ReactSVG className="block dark:hidden" src="/logo-dark.svg"/>
                        <ReactSVG className="hidden dark:block" src="/logo-light.svg"/>
                    </h1>
                </li>
            </div>
            <div className="flex justify-between grow
                            px-6 lg:px-8 py-4 lg:py-5
                            border-l border-kl-lines dark:border-kd-lines">
                <h2 className="my-auto heading-xl">{board.id == 0 ? "" : board.name}</h2>
                <div className="flex space-x-6 justify-items-center items-center ">
                    <li
                        // onClick={callApiDidi}
                    >
                        {avatar && avatar}
                        {!avatar &&
                            <a href={process.env.NODE_ENV == "development" ? `/api/discord-login` : `https://api.kaban.ntoniolo.wtf/discord-login`}>
                                <svg className="svg-icon w-5 fill-k-purple" viewBox="0 0 20 20">
                                    <path
                                        d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
                                </svg>
                            </a>
                        }
                    </li>
                    <li>
                        <button
                            className="bg-k-purple px-6 h-12 flex items-center justify-center rounded-3xl disabled:opacity-25 hover:bg-kh-purple"
                            disabled={board.id == 0 || columnNames.length == 0}
                            onClick={setAddMainTaskUrl}
                        >
                            <span className="text-white heading-m">+ Add New Task</span>
                        </button>
                    </li>
                    <li>
                        <EditDeleteMenu
                            className="right-0 top-full mt-4 drop-shadow"
                            menuSize={EditDeleteMenuSize.Big}
                            actionEdit={{name: "Edit Board", onClick: setEditBoardUrl}}
                            actionDelete={{name: "Delete Board", onClick: () => setDeleteBoardUrl(board.id)}}
                        />
                    </li>
                </div>
            </div>
        </menu>
    );
}
