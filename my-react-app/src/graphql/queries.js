import { gql } from '@apollo/client';

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
        }
    }
`;
