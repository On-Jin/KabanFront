'use server'
import SwitchTheme from "@/components/switch-theme";
import {ApolloClient, createHttpLink, gql, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {cookies} from "next/headers";
import BoardsComponent from "@/components/BoardsComponent";
import React from "react";
import {BoardsProvider} from "@/context/BoardsContext";

const httpLink = createHttpLink({
    uri: `${process.env.API_PROXY}/graphql`,
});

const authLink = setContext((_, {headers}) => {
    const cookieValue = cookies().get(".AspNetCore.Cookies")?.value;
    return {
        headers: {
            ...headers,
            Cookie: `.AspNetCore.Cookies=${cookieValue}`,
        },
    };
});

const createApolloClient = () => {
    return new ApolloClient({
        uri: process.env.API_PROXY,
        cache: new InMemoryCache(),
        link: authLink.concat(httpLink),
    });
};

export default async function Home() {

    // Server side query!
    // const client = createApolloClient();
    // const data = await client.query({
    //     query: gql`
    //   query Q {
    //       me {
    //         discordAvatarUrl
    //         discordUsername
    //         id
    //       }
    //     }
    // `,
    // })

    return (
        <>
            <SwitchTheme/>
            <BoardsComponent/>
        </>
    );
}
