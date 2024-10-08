import React from 'react';
import { useQuery, gql } from '@apollo/client';
import ToggleFavoriteButton from './ToggleFavoriteButton';

const GET_BOOKS = gql`
    query GetBooks {
        books {
            id
            title
            author {
                name
            }
            isFavorite @client
        }
    }
`;

function BookList() {
    const { loading, error, data } = useQuery(GET_BOOKS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2>Book List</h2>
            <ul>
                {data.books.map((book) => (
                    <li key={book.id}>
                        <strong>{book.title}</strong> by {book.author.name}
                        {book.isFavorite ? ' ★' : ''}
                        <ToggleFavoriteButton book={book} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookList;
