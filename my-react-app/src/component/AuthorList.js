import React from 'react';
import { useQuery, useApolloClient } from '@apollo/client';
import { AUTHORS_QUERY, AUTHOR_DETAILS_QUERY } from '../graphql/queries'; // Update with the actual query imports

function AuthorList() {
    const { loading, error, data } = useQuery(AUTHORS_QUERY);
    const client = useApolloClient();

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
            <h2>Author List</h2>
            <ul>
                {data.authors.map((author) => (
                    <li key={author.id}>
                        <strong
                            onMouseOver={() =>
                                client.query({
                                    query: AUTHOR_DETAILS_QUERY,
                                    variables: { id: author.id },
                                })
                            }
                        >
                            {author.name}
                        </strong> (ID: {author.id}) - Company: {author.company.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AuthorList;
