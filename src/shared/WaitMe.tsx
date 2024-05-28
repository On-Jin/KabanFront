'use client'
import {DataProvider, useData} from "@/context/DataContext";
import Content from "@/shared/Content";

export default function WaitMe({children}: { children: React.ReactNode }) {
    const {loading} = useData();

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <Content>
                {children}
            </Content>
        </>
    );
}