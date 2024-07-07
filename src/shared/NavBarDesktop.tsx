'use client';
import {useData} from "@/context/DataContext";
import {useBoardStore} from "@/hooks/useStore";
import React from "react";
import useSetUrl from "@/hooks/useSetUrl";
import EditDeleteMenu, {EditDeleteMenuSize} from "@/components/EditDeleteMenu";
import {ReactSVG} from "react-svg";

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
                    className="h-10 w-10 rounded-full"
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
                    <li>
                        {avatar && avatar}
                        {!avatar &&
                            <a href={process.env.NODE_ENV == "development" ? `/api/discord-login` : `https://api.kaban.ntoniolo.wtf/discord-login`}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     className="w-10 " viewBox="0 -28.5 256 256" version="1.1"
                                     preserveAspectRatio="xMidYMid">
                                    <g>
                                        <path
                                            d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
                                            fill="#5865F2" fill-rule="nonzero">

                                        </path>
                                    </g>
                                </svg>
                                {/*<svg className="svg-icon w-6 fill-k-purple stroke-[0.3] stroke-k-purple"*/}
                                {/*     viewBox="0 0 20 20">*/}
                                {/*    <path*/}
                                {/*        d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>*/}
                                {/*</svg>*/}
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
