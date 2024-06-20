// 'use client';
import Image from "next/image";
import logoMobile from '/public/logo-mobile.svg';
import iconChevronDown from "/public/icon-chevron-down.svg";
import iconVerticalEllipsis from '/public/icon-vertical-ellipsis.svg';
import iconAddTaskMobile from '/public/icon-add-task-mobile.svg';
import {useData} from "@/context/DataContext";
import {useBoardStore} from "@/hooks/useStore";
import KButton, {KButtonType} from "@/components/KButton";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {ModalState} from "@/components/ModalHandler";

export default function NavBar() {
    const {data} = useData();
    const board = useBoardStore((state) => state.board);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();


    let avartar = <></>;
    if (data.discordAvatarUrl != undefined) {
        avartar = (
            <img
                className="h-6 w-6 rounded-full"
                src={data.discordAvatarUrl}
            />
        )
    }

    function setAddNewTaskUrl() {
        const params = new URLSearchParams(searchParams?.toString());
        params.set('task', "0");
        params.set('action', ModalState.CreateMainTask.toString());
        replace(`${pathname}?${params.toString()}`);
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
                    <button
                        className="bg-k-purple px-4 h-8 flex items-center justify-center rounded-3xl disabled:opacity-25 hover:bg-kh-purple"
                        disabled={board.id == 0}
                        onClick={setAddNewTaskUrl}
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
