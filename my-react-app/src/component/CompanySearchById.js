import React, {useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {SEARCH_COMPANY_BY_ID_QUERY} from "../graphql/queries";

function CompanySearchById() {
    const [id, setId] = useState('');
    const [searchCompanyById, {loading, error, data}] = useLazyQuery(
        SEARCH_COMPANY_BY_ID_QUERY);

    const handleSubmit = (e) => {
        e.preventDefault();
        searchCompanyById({variables: {id}});
    };

    return (
        <div>
            <h2>Search Company by ID</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Company ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && data.searchCompanyById && (
                <div>
                    <h3>Company Details</h3>
                    <p><strong>ID:</strong> {data.searchCompanyById.id}</p>
                    <p><strong>Name:</strong> {data.searchCompanyById.name}</p>
                </div>
            )}
        </div>
    );
}

export default CompanySearchById;
