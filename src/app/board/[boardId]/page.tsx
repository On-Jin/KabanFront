'use client'
import React, {useEffect, useState,} from "react";
import {usePathname, useSearchParams} from "next/navigation";
import {useParams} from 'next/navigation';
import {useBoardStore} from "@/hooks/useStore";
import BoardComponent from "@/components/BoardComponent";
import ModalHandler from "@/components/ModalHandler";

export default function BoardPage() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = useParams();
    const [isFetching, setIsFetching] = useState(true)

    const fetchBoard = useBoardStore((state) => state.fetchBoard);


    useEffect(() => {
        fetchBoard(parseInt(params!.boardId as string)).then(() => {
            setIsFetching(false);
        });
    }, [pathname, searchParams])

    return (
        <>
            {!isFetching && (
                <>
                    <div className="touch-manipulation w-full grow flex flex-col">
                        <BoardComponent/>
                    </div>
                    <ModalHandler/>
                </>
            )}
        </>);
}
