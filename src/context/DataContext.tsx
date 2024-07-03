'use client';
import {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import {ApolloProvider} from "@apollo/client";
import createApolloClient from "@/lib/ApolloClient";
import {useBoardStore} from "@/hooks/useStore";

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
    const fetchIds = useBoardStore((state) => state.fetchIds);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await fetch('/api/me');
            const result = await response.json();
            setData(result);
            await fetchIds();
            setLoading(false);
            client = createApolloClient();
        };

        fetchData();
    }, []);

    return (
        <ApolloProvider client={client}>
            <DataContext.Provider value={{data, loading}}>
                {children}
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
