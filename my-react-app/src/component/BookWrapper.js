import React from 'react';
import BookList from './BookList';
import AddBook from './AddBook';

function BookWrapper() {
    return (
        <div>
            <h1>Book Management</h1>
            <AddBook />
            <BookList />
        </div>
    );
}

export default BookWrapper;
