import React from 'react';
import { useQuery } from '@apollo/client';
import { BOOKS_QUERY } from '../graphql/queries';

function BookList() {
    const { loading, error, data } = useQuery(BOOKS_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) {
        if (error.networkError) {
            return <p>Network Error: {error.networkError.message}</p>;
        }
        if (error.graphQLErrors.length > 0) {
            return <p>GraphQL Error: {error.graphQLErrors[0].message}</p>;
        }
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <h2>Book List</h2>
            <ul>
                {data.books.map((book) => (
                    <li key={book.id}>
                        <strong>{book.title}</strong> by {book.author.name} (Author ID: {book.author.id}) - Company: {book.author.company.name} (Company ID: {book.author.company.id})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookList;
