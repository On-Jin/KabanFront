﻿import {useSearchParams, usePathname, useRouter} from 'next/navigation';
import {ModalState} from "@/components/Modals/ModalHandler";

const useTaskUrl = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const setAddMainTaskUrl = () => {
        const params = new URLSearchParams(searchParams?.toString());
        params.delete('id');
        params.set('action', ModalState.CreateMainTask.toString());
        replace(`${pathname}?${params.toString()}`);
    };

    function setViewMainTaskUrl(id: number) {
        const params = new URLSearchParams(searchParams?.toString());
        params.set('id', id.toString());
        params.set('action', ModalState.ViewMainTask.toString());
        replace(`${pathname}?${params.toString()}`);
    }

    function setEditTaskModalUrl(id: number) {
        const params = new URLSearchParams(searchParams?.toString());
        params.set('id', id.toString());
        params.set('action', ModalState.EditMainTask.toString());
        replace(`${pathname}?${params.toString()}`);
    }

    function setDeleteTaskModalUrl(id: number) {
        const params = new URLSearchParams(searchParams?.toString());
        params.set('id', id.toString());
        params.set('action', ModalState.DeleteMainTask.toString());
        replace(`${pathname}?${params.toString()}`);
    }

    function setAddBoardUrl() {
        const params = new URLSearchParams(searchParams?.toString());
        params.delete('id');
        params.set('action', ModalState.CreateBoard.toString());
        console.log(`${pathname}?${params.toString()}`)
        replace(`${pathname}?${params.toString()}`);
    }

    function setEditBoardUrl() {
        const params = new URLSearchParams(searchParams?.toString());
        params.delete('id');
        params.set('action', ModalState.EditBoard.toString());
        console.log(`${pathname}?${params.toString()}`)
        replace(`${pathname}?${params.toString()}`);
    }

    function setDeleteBoardUrl(id: number) {
        const params = new URLSearchParams(searchParams?.toString());
        params.set('id', id.toString());
        params.set('action', ModalState.DeleteBoard.toString());
        console.log(`${pathname}?${params.toString()}`)
        replace(`${pathname}?${params.toString()}`);
    }

    return {
        setAddMainTaskUrl,
        setViewMainTaskUrl,
        setEditTaskModalUrl,
        setAddBoardUrl,
        setEditBoardUrl,
        setDeleteTaskModalUrl,
        setDeleteBoardUrl
    };
};

export default useTaskUrl;
