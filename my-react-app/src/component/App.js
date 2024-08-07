import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from '../ApolloClient.js';
import BookWrapper from './BookWrapper';
import CompanySearchById from './CompanySearchById';
import AuthorList from './AuthorList';

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <div className="App">
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Book List</Link>
                            </li>
                            <li>
                                <Link to="/search-company">Search Company</Link>
                            </li>
                            <li>
                                <Link to="/authors">Authors</Link>
                            </li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route path="/" element={<BookWrapper />} />
                        <Route path="/search-company" element={<CompanySearchById />} />
                        <Route path="/authors" element={<AuthorList />} />
                    </Routes>
                </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;
