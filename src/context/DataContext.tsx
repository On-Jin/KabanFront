'use client';
import {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import {ApolloProvider} from "@apollo/client";
import createApolloClient, {refreshAuthLink} from "@/lib/ApolloClient";
import {BoardsProvider} from "@/context/BoardsContext";

interface DataContextType {
    data: any;
    loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
    children: ReactNode;
    initialData?: any;
}

let client = createApolloClient();


export const DataProvider = ({children}: DataProviderProps) => {
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await fetch('/api/me');
            const result = await response.json();
            setData(result);
            setLoading(false);
            console.log(result);
            // refreshAuthLink();
            client = createApolloClient();
        };

        fetchData();
    }, []);

    return (
        <ApolloProvider client={client}>
            <DataContext.Provider value={{data, loading}}>
                <BoardsProvider>
                    {/*<BoardsProvider>*/}
                    {children}
                    {/*</BoardsProvider>*/}
                </BoardsProvider>
            </DataContext.Provider>
        </ApolloProvider>

    );
};

export const useData = (): DataContextType => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};