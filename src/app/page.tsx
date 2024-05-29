'use server'
import SwitchTheme from "@/components/switch-theme";
import {ApolloClient, createHttpLink, gql, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {cookies} from "next/headers";
import BoardsComponent from "@/components/BoardsComponent";
import React from "react";

const httpLink = createHttpLink({
    uri: "http://localhost:5264/graphql",
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
        uri: "http://localhost:5264",
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
