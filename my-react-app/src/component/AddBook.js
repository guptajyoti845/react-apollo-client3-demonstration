import React, {useState} from 'react';
import {gql, useMutation} from '@apollo/client';
import {CREATE_BOOK_MUTATION} from '../graphql/mutations';
import {favoriteBookVar} from "./reactiveVars";

function AddBook() {
    const [title, setTitle] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [companyName, setCompanyName] = useState('');

    const [createBook] = useMutation(CREATE_BOOK_MUTATION, {
        optimisticResponse: {
            __typename: 'Mutation',
            createBook: {
                __typename: 'Book',
                id: 'book-optimistic-id',
                title,
                author: {
                    __typename: 'Author',
                    id: 'author-optimistic-id',
                    name: authorName,
                    company: {
                        __typename: 'Company',
                        id: 'company-optimistic-id',
                        name: companyName,
                    },
                },
                isFavorite: false,
            },
        },
        update: (cache, {data: {createBook}}) => {
            cache.modify({
                fields: {
                    books(existingBooks = []) {
                        const newBookRef = cache.writeFragment({
                            data: {
                                ...createBook,
                                isFavorite: false,
                            },
                            fragment: gql`
                                fragment NewBook on Book {
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
                                    isFavorite
                                }
                            `,
                        });
                        return [...existingBooks, newBookRef];
                    },
                },
            });
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createBook({
            variables: {
                input: {
                    title,
                    author: {
                        name: authorName,
                        company: {
                            name: companyName,
                        },
                    },
                },
            },
        }).catch((err) => console.error('Mutation Error:', err));
        setTitle('');
        setAuthorName('');
        setCompanyName('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add a New Book</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Author Name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
            />
            <button type="submit">Add Book</button>
        </form>
    );
}

export default AddBook;
