'use client'
import {useData} from "@/context/DataContext";
import Content from "@/shared/Content";
import {useBoardStore} from "@/hooks/useStore";
import {usePathname, useRouter} from "next/navigation";
import {useEffect} from "react";

export default function WaitMe({children}: { children: React.ReactNode }) {
    const {loading} = useData();
    const fetchIds = useBoardStore((state) => state.fetchIds);
    const boardIds = useBoardStore((state) => state.boardIds);
    const {replace} = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (boardIds != null && boardIds?.length != 0) {
            if (pathname == "/")
                replace(`/board/${boardIds[0].id}`);
        }
    }, [boardIds]);
    
    if (loading) return <div>Loading...</div>;

    if (!boardIds) {
        fetchIds();
        return <div>Loading...</div>;
    }

    return (
        <>
            <Content>
                {children}
            </Content>
        </>
    );
}