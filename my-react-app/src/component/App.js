import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '../ApolloClient.js';
import BookList from './BookList';
import AddBook from './AddBook';
import CompanySearchById from './CompanySearchById';

function App() {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <h1>Book Store</h1>
                <AddBook />
                <BookList />
                <CompanySearchById />
            </div>
        </ApolloProvider>
    );
}

export default App;
