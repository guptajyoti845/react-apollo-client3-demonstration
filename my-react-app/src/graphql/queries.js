import { gql } from '@apollo/client';

export const AUTHORS_QUERY = gql`
    query GetAuthors {
        authors {
            id
            name
            company {
                id
                name
            }
        }
    }
`;

export const BOOKS_QUERY = gql`
    query GetBooks {
        books {
            id
            title
            author {
                id
                name
                company {
                    id
                    name
                }
            }
        }
    }
`;

export const SEARCH_COMPANY_BY_ID_QUERY = gql`
    query SearchCompanyById($id: ID!) {
        searchCompanyById(id: $id) {
            id
            name
            isLocal @client
        }
    }
`;
export const AUTHOR_DETAILS_QUERY = gql`
    query GetAuthorDetails($id: ID!) {
        author(id: $id) {
            id
            name
            bio
        }
    }
`;
