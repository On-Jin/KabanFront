import {ApolloClient, ApolloLink, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import Cookies from "js-cookie";
// import {cookies} from "next/headers";

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


const createApolloClient = () => {
    return new ApolloClient({
        uri: "http://localhost:5264",
        cache: new InMemoryCache(),
        link: authLink.concat(httpLink),
        connectToDevTools: true
    });
};

export default createApolloClient;