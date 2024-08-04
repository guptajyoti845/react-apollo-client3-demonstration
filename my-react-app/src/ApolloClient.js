import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http';
import { onError } from '@apollo/client/link/error';
import { ApolloLink } from '@apollo/client';

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

const omitIntrospectionLink = new ApolloLink((operation, forward) => {
    if (operation.operationName === 'IntrospectionQuery') {
        return null;
    }
    return forward(operation);
});

const client = new ApolloClient({
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    books: {
                        merge(existing = [], incoming) {
                            return [...existing, ...incoming];
                        },
                    },
                },
            },
            Book: {
                keyFields: ["id"],
            },
            Author: {
                keyFields: ["id"],
            },
            Company: {
                keyFields: ["id"],
            },
        },
    }),
    link: from([errorLink, omitIntrospectionLink, httpLink]),
});

export default client;
