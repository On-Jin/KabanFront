'use client'
import {DataProvider, useData} from "@/context/DataContext";
import Content from "@/shared/Content";
import Cookies from "js-cookie";
import {refreshAuthLink} from "@/lib/ApolloClient";
import {useBoardStore} from "@/hooks/useStore";

export default function WaitMe({children}: { children: React.ReactNode }) {
    const {loading} = useData();
    const fetchIds = useBoardStore((state) => state.fetchIds);
    const boardIds = useBoardStore((state) => state.boardIds);

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