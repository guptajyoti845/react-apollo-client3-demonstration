import React from 'react';
import { useQuery, gql } from '@apollo/client';
import ToggleFavoriteButton from './ToggleFavoriteButton';

const GET_FAVORITE_BOOKS = gql`
    query GetFavoriteBooks {
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

function FavoriteBooks() {
    const { data, loading, error } = useQuery(GET_FAVORITE_BOOKS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const favoriteBooks = data.books.filter(book => book.isFavorite);

    return (
        <div>
            <h3>Favorite Books</h3>
            <ul>
                {favoriteBooks.map((book, index) => (
                    <li key={index}>
                        {book.title} by {book.author.name}
                        <ToggleFavoriteButton book={book} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FavoriteBooks;
