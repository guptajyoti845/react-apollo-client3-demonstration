import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http';
import { onError } from '@apollo/client/link/error';
import { gql } from '@apollo/client';
import { favoriteBookVar } from './component/reactiveVars';

const typeDefs = gql`
    extend type Book {
        isFavorite: Boolean!
    }
`;

const resolvers = {
    Book: {
        isFavorite: (book) => {
            return favoriteBookVar().some(favoriteBook => favoriteBook.id === book.id);
        },
    },
};

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
            Book: {
                fields: {
                    isFavorite: {
                        read(_, { readField }) {
                            return resolvers.Book.isFavorite({ id: readField('id') });
                        },
                    },
                },
            },
        },
    }),
    link: from([errorLink, httpLink]),
    typeDefs,
    resolvers,
});

export default client;
