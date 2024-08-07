import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        );
    }
    if (networkError) {
        console.error(`[Network error]: ${networkError}`);
    }
});

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

const client = new ApolloClient({
    cache: new InMemoryCache({
        typePolicies: {
            Company: {
                keyFields: ["id"],
                fields: {
                    isLocal: {
                        read(_, { readField }) {
                            const localCompanies = ['Penguin Random House', 'Chatto & Windus'];
                            return localCompanies.includes(readField('name'));
                        },
                    },
                },
            },
        },
    }),
    link: from([errorLink, httpLink]),
});

export default client;
