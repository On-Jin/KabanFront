import {ApolloClient, ApolloLink, createHttpLink, DefaultOptions, from, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import Cookies from "js-cookie";
import {removeTypenameFromVariables} from '@apollo/client/link/remove-typename';
// import {cookies} from "next/headers";


const removeTypenameLink = removeTypenameFromVariables();

const httpLink = createHttpLink({
    uri: "/api/graphql/",
    credentials: 'include'
});

let authLink: ApolloLink;

export const refreshAuthLink = () => {
    authLink = setContext((_, {headers}) => {
        const token = Cookies.get(".AspNetCore.Cookies")
        // const token = cookies().get(".AspNetCore.Cookies");
        console.log(Cookies.get());
        console.log(token);
        console.log("_____");
        console.log(headers);
        return {
            headers: {
                ...headers,
                // authorization: token ? `Bearer ${token}` : "",
            },
        };
    });
};

refreshAuthLink();


const defaultOptions: DefaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
};

const createApolloClient = () => {
    return new ApolloClient({
        uri: process.env.API_PROXY,
        cache: new InMemoryCache({
            addTypename: false,
        }),
        link: from([removeTypenameLink, authLink, httpLink]),
        connectToDevTools: true,
        defaultOptions
    });
};

export default createApolloClient;