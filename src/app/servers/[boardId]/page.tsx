'use server'
import {ApolloClient, createHttpLink, gql, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {cookies} from "next/headers";

const httpLink = createHttpLink({
    uri: "http://localhost:5264/graphql",
});

const authLink = setContext((_, {headers}) => {
    const cookieValue = cookies().get("kaban-cookie")?.value;
    return {
        headers: {
            ...headers,
            Cookie: `kaban-cookie=${cookieValue}`,
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


export default async function BoardPage() {
    const client = createApolloClient();
    const data = await client.query({
        query: gql`
            query Q {
                me {
                    discordAvatarUrl
                    discordUsername
                    id
                }
            }
        `,
    })
    return (
        <>
            {JSON.stringify(data, null, 2)}
            <div>Hi ! ${process.env.API_PROXY}</div>
        </>
    );
}
