'use client';
import {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import {ApolloProvider} from "@apollo/client";
import createApolloClient from "@/lib/ApolloClient";

interface DataContextType {
    data: any;
    loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
    children: ReactNode;
    initialData?: any;
}

const client = createApolloClient();


export const DataProvider = ({children, initialData = null}: DataProviderProps) => {
    const [data, setData] = useState<any>(initialData);
    const [loading, setLoading] = useState<boolean>(!initialData);

    useEffect(() => {
        if (!initialData) {
            const fetchData = async () => {
                setLoading(true);
                const response = await fetch('/api/me');
                const result = await response.json();
                setData(result);
                setLoading(false);
                console.log(result);
            };

            fetchData();
        }
    }, [initialData]);

    return (
        <ApolloProvider client={client}>

            <DataContext.Provider value={{data, loading}}>
                {/*<BoardsProvider>*/}
                {children}
                {/*</BoardsProvider>*/}
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