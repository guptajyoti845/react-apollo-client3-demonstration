import { gql } from '@apollo/client';

export const CREATE_BOOK_MUTATION = gql`
    mutation CreateBook($input: BookInput!) {
        createBook(input: $input) {
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
